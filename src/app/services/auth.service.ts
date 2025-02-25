import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (user) {
      this.isAuthenticated = true;
    }
  }

  login(email: string, password: string, rememberMe: boolean): boolean {
    if (email && password) {
      if (rememberMe) {
        localStorage.setItem('user', email);
      } else {
        sessionStorage.setItem('user', email);
      }
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    if (!localStorage.getItem(email)) {
      localStorage.setItem(email, password);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    this.isAuthenticated = false;
  }

  isUserAuthenticated(): boolean {
    return localStorage.getItem('user') !== null || sessionStorage.getItem('user') !== null;
  }

  getUser(): string {
    return localStorage.getItem('user') || sessionStorage.getItem('user') || '';
  }
}
