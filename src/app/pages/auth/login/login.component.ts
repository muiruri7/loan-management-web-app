import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/dashboard']); // Redirect if already logged in
    }
  }

  onLogin() {
    if (this.authService.login(this.email, this.password, this.rememberMe)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
