import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  errorMessage: string = '';

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => (this.errorMessage = 'Failed to load customers')
    });
  }

  deleteCustomer(id: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => this.loadCustomers(),
        error: (err) => (this.errorMessage = 'Failed to delete customer')
      });
    }
  }

  editCustomer(id: string): void {
    this.router.navigate([`/customers/edit/${id}`]);
  }
}
