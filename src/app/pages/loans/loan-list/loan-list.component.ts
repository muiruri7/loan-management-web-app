import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../services/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  loans: any[] = [];
  errorMessage: string = '';

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe({
      next: (data) => (this.loans = data),
      error: (err) => (this.errorMessage = 'Failed to load loans')
    });
  }

  deleteLoan(id: string): void {
    if (confirm('Are you sure you want to delete this loan?')) {
      this.loanService.deleteLoan(id).subscribe({
        next: () => this.loadLoans(),
        error: (err) => (this.errorMessage = 'Failed to delete loan')
      });
    }
  }

  editLoan(id: string): void {
    this.router.navigate([`/loans/edit/${id}`]);
  }
}
