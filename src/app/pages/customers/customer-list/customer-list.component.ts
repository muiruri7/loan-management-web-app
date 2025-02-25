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
  filteredCustomers: any[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  sortColumn: string = '';
  sortAscending: boolean = true;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
        this.filteredCustomers = data;
      },
      error: () => (this.errorMessage = 'Failed to load customers')
    });
  }

  filterCustomers(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      customer.phone.includes(this.searchTerm)
    );
  }

  sortCustomers(column: string): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending; // Toggle sorting order
    } else {
      this.sortColumn = column;
      this.sortAscending = true; // Default to ascending on column change
    }

    this.filteredCustomers.sort((a, b) => {
      const valA = a[column].toString().toLowerCase();
      const valB = b[column].toString().toLowerCase();
      return this.sortAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
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
