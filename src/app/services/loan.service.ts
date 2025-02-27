import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'http://197.155.71.138:8083/api/v1/loans';
  private customerBaseUrl = 'http://197.155.71.138:8083/api/v1/customer';

  // Cache for loans
  private loansCache = new ReplaySubject<any[]>(1);
  private customerLoansCache = new Map<string, ReplaySubject<any[]>>();

  constructor(private http: HttpClient) {}

  getLoans(): Observable<any[]> {
    if (!this.loansCache.observed) {
      return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
        tap(data => this.loansCache.next(data)), // Cache the response
        catchError(this.handleError)
      );
    }
    return this.loansCache.asObservable();
  }

  getLoan(loanId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${loanId}`).pipe(catchError(this.handleError));
  }

  applyLoan(customerId: string, loanData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${customerId}/apply`, loanData).pipe(
      tap(() => this.invalidateCache()), // Invalidate cache on data change
      catchError(this.handleError)
    );
  }

  updateLoan(loanId: string, loanData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${loanId}`, loanData).pipe(
      tap(() => this.invalidateCache()),
      catchError(this.handleError)
    );
  }

  checkLoanStatus(loanId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${loanId}/status`).pipe(catchError(this.handleError));
  }

  getCustomerLoans(customerId: string): Observable<any[]> {
    if (!this.customerLoansCache.has(customerId)) {
      this.customerLoansCache.set(customerId, new ReplaySubject<any[]>(1));

      this.http.get<any[]>(`${this.customerBaseUrl}/${customerId}`).pipe(
        tap(data => this.customerLoansCache.get(customerId)?.next(data)),
        catchError(this.handleError)
      ).subscribe();
    }
    return this.customerLoansCache.get(customerId)!.asObservable();
  }

  deleteLoan(loanId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${loanId}`).pipe(
      tap(() => this.invalidateCache()),
      catchError(this.handleError)
    );
  }

  private invalidateCache(): void {
    this.loansCache = new ReplaySubject<any[]>(1);
    this.customerLoansCache.clear();
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error(error.error?.message || 'Something went wrong! Please try again.'));
  }
}
