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
  filteredLoans: any[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  sortColumn: string = '';
  sortAscending: boolean = true;

  constructor(private loanService: LoanService, private router: Router) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe({
      next: (data) => {
        this.loans = data;
        this.filteredLoans = data;
      },
      error: () => (this.errorMessage = 'Failed to load loans')
    });
  }

  filterLoans(): void {
    this.filteredLoans = this.loans.filter(loan =>
      loan.borrower.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      loan.amount.toString().includes(this.searchTerm) ||
      loan.term.toString().includes(this.searchTerm) ||
      loan.repaymentFrequency.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      loan.startDate.includes(this.searchTerm) ||
      loan.endDate.includes(this.searchTerm) ||
      loan.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortLoans(column: string): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }

    this.filteredLoans.sort((a, b) => {
      const valA = a[column].toString().toLowerCase();
      const valB = b[column].toString().toLowerCase();
      return this.sortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  deleteLoan(id: string): void {
    if (confirm('Are you sure you want to delete this loan?')) {
      this.loanService.deleteLoan(id).subscribe({
        next: () => this.loadLoans(),
        error: () => (this.errorMessage = 'Failed to delete loan')
      });
    }
  }

  editLoan(id: string): void {
    this.router.navigate([`/loans/edit/${id}`]);
  }
}
