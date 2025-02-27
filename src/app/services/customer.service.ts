import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://197.155.71.138:8083/api/v1/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAllCustomers`).pipe(catchError(this.handleError));
  }

  getCustomer(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getCustomer/${id}`).pipe(catchError(this.handleError));
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/createCustomer`, customer).pipe(
      catchError(this.handleError)
    );
  }

  updateCustomer(id: string, customer: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateCustomer/${id}`, customer).pipe(catchError(this.handleError));
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteCustomer/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Customer Service Error:', error);
    return throwError(() => new Error(error.error?.message || `HTTP ${error.status}: ${error.statusText}` || 'Something went wrong! Please try again.'));
  }
  
}
