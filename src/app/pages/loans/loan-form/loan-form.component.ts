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
  loan: any = {
    borrower: '',
    amount: '',
    type: '',
    termWeeks: 0,
    termMonths: 0,
    termYears: 0,
    repaymentFrequency: '',
    startDate: '',
    endDate: '',
    interestRate: '',
    status: 'Pending'
  };
  errorMessage: string = '';
  customerService: any;
  customers: any;

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

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data: any) => (this.customers = data),
      error: () => console.error('Failed to load customers')
    });
  }

  submitLoan(): void {
    if (!this.loan.borrower || !this.loan.amount || !this.loan.type) return;

    this.loan.term = (this.loan.termWeeks * 7) + (this.loan.termMonths * 30) + (this.loan.termYears * 365);
    
    if (this.isEdit) {
      this.loanService.updateLoan(this.loan.id, this.loan).subscribe(() => {
        this.router.navigate(['/loans']);
      });
    } else {
      this.loanService.addLoan(this.loan).subscribe(() => {
        this.router.navigate(['/loans']);
      });
    }
  }
}
