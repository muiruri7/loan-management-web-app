import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  isEdit: boolean = false;
  customer: any = { first_name: '',last_name: '', email: '', phone: '', address: '', dob: '', nationalId: '', gender: '' };  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.customerService.getCustomer(id).subscribe({
        next: data => this.customer = data,
        error: err => this.errorMessage = err.message
      });
    }
  }

  submitCustomer(): void {
    if (!this.customer.first_name ||!this.customer.last_name || !this.customer.email || !this.customer.phone) return;

    if (this.isEdit) {
      this.customerService.updateCustomer(this.customer.id, this.customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.customerService.addCustomer(this.customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }
}
