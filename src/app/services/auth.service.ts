import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://your-api-url.com/auth'; // Replace with actual API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }

  login(identifier: string, password: string, rememberMe: boolean): Observable<any> {
    const isEmail = identifier.includes('@');
    const loginData = isEmail ? { email: identifier, password } : { firstName: identifier, password };
  
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        if (response.token && response.user) {
          const storage = rememberMe ? localStorage : sessionStorage;
          storage.setItem('token', response.token);
          storage.setItem('user', response.user.firstName); // Store user's first name
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }


  register(first_name: string, last_name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { first_name, last_name, email, password });
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
