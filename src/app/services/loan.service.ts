import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8080/api/loans';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getLoan(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  addLoan(loan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, loan).pipe(catchError(this.handleError));
  }

  updateLoan(id: string, loan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, loan).pipe(catchError(this.handleError));
  }

  deleteLoan(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong! Please try again.'));
  }
}
