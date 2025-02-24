import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(email: string, password: string): boolean {
    if (email && password) {
      sessionStorage.setItem('user', email);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('user') !== null;
  }

  logout(): void {
    sessionStorage.clear();
  }
}
