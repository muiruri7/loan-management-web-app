import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getCustomer(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer).pipe(catchError(this.handleError));
  }

  updateCustomer(id: string, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer).pipe(catchError(this.handleError));
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong! Please try again.'));
  }
}
