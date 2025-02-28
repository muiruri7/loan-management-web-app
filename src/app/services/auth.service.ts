import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registerUrl = 'http://172.16.8.26:8083/api/v1/auth/register';
  private loginUrl = 'http://172.16.8.26:8083/api/v1/auth/login';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }

  register(first_name: string, last_name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { first_name, last_name, email, password }).pipe(
      retry(2), // ✅ Retry 2 times before failing (Only for network issues)
      catchError(this.handleError) // ✅ Centralized error handling
    );
  }

  login(identifier: string, password: string, rememberMe: boolean): Observable<any> {
    const isEmail = identifier.includes('@');
    const loginData = isEmail ? { email: identifier, password } : { firstName: identifier, password };

    return this.http.post<any>(this.loginUrl, loginData).pipe(
      tap(response => {
        if (response.token && response.user) {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('token', response.token);
          storage.setItem('user', response.user.firstName);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(this.handleError) // ✅ Centralized error handling
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getUser(): string {
    return localStorage.getItem('user') || sessionStorage.getItem('user') || '';
  }

  /**
   * ✅ Centralized Error Handling
   * - Logs error details
   * - Provides user-friendly error messages
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client Error:', error.error.message);
      errorMessage = 'Something went wrong on your device. Try again.';
    } else {
      // Server-side error
      console.error(`Server Error: ${error.status} - ${error.message}`);
      if (error.status === 0) {
        errorMessage = 'Could not connect to the server. Please check your internet.';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Invalid request. Please check your input.';
      } else if (error.status === 401) {
        errorMessage = 'Unauthorized. Please check your credentials.';
      } else if (error.status === 403) {
        errorMessage = 'Access denied. You do not have permission.';
      } else if (error.status === 500) {
        errorMessage = 'Internal server error. Please try again later.';
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
