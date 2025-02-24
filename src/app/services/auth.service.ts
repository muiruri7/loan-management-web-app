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
      const role = email.includes('admin') ? 'admin' : 'user'; // Set role
      if (rememberMe) {
        localStorage.setItem('user', email);
        localStorage.setItem('role', role);
      } else {
        sessionStorage.setItem('user', email);
        sessionStorage.setItem('role', role);
      }
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // ✅ FIX: Add register method
  register(email: string, password: string): boolean {
    if (!localStorage.getItem(email)) {
      localStorage.setItem(email, password);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    this.isAuthenticated = false;
  }

  isUserAuthenticated(): boolean {
    return localStorage.getItem('user') !== null || sessionStorage.getItem('user') !== null;
  }

  getUser(): string {
    return localStorage.getItem('user') || sessionStorage.getItem('user') || '';
  }

  getUserRole(): string {
    return localStorage.getItem('role') || sessionStorage.getItem('role') || 'user';
  }
}
