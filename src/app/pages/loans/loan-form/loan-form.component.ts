import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.css']
})
export class LoanFormComponent implements OnInit {
  isEdit: boolean = false;
  loan = { id: '', borrower: '', amount: 0, status: 'Pending' };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.loanService.getLoan(id).subscribe({
        next: data => this.loan = data,
        error: err => this.errorMessage = err.message
      });
    }
  }

  submitLoan() {
    if (this.isEdit) {
      this.loanService.updateLoan(this.loan.id, this.loan).subscribe({
        next: () => this.router.navigate(['/loans']),
        error: err => this.errorMessage = err.message
      });
    } else {
      this.loanService.addLoan(this.loan).subscribe({
        next: () => this.router.navigate(['/loans']),
        error: err => this.errorMessage = err.message
      });
    }
  }
}
