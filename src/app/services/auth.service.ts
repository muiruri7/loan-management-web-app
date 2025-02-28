import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
      retry(3), // Retry up to 3 times before failing
      catchError(error => {
        console.error('Registration Error:', error);
        return throwError(() => new Error('Could not connect to the server. Please check your connection.'));
      })
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
      })
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

}
