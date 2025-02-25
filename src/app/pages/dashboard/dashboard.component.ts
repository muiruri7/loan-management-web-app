import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  analysis = {
    totalLoans: 0,
    approvedLoans: 0,
    pendingLoans: 0
  };

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchLoanData();
  }

  fetchLoanData(): void {
    this.loanService.getLoans().subscribe({
      next: (loans) => {
        this.analysis.totalLoans = loans.length;
        this.analysis.approvedLoans = loans.filter(loan => loan.status === 'approved').length;
        this.analysis.pendingLoans = loans.filter(loan => loan.status === 'pending').length;
      },
      error: (err) => console.error('Failed to fetch loan data:', err)
    });
  }
}
