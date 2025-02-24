import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor() {}

  login(email: string, password: string): boolean {
    if (email && password) {
      sessionStorage.setItem('user', email);
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  register(email: string, password: string): boolean {
    if (!sessionStorage.getItem(email)) {
      sessionStorage.setItem(email, password);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.clear();
    this.isAuthenticated = false;
  }

  isUserAuthenticated(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
}
