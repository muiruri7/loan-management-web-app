import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanService } from '../../../services/loan.service';
import { CustomerService } from '../../../services/customer.service';

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
  customers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService,
    private customerService: CustomerService // ✅ Inject CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomers(); // ✅ Load customers when the component initializes
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
    if (!this.loan.borrower || !this.loan.amount || !this.loan.type) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.loan.term = (this.loan.termWeeks * 7) + (this.loan.termMonths * 30) + (this.loan.termYears * 365);

    if (this.isEdit) {
      this.loanService.updateLoan(this.loan.id, this.loan).subscribe(() => {
        this.router.navigate(['/loans']);
      });
    } else {
      const customerId = this.loan.borrower; // Assuming borrower ID is stored in `borrower`
      this.loanService.applyLoan(customerId, this.loan).subscribe(() => {
        this.router.navigate(['/loans']);
      });
    }
  }
}
