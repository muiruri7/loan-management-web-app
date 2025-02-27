import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  identifier = ''; // Can be either first name or email
  password = '';
  rememberMe = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    this.authService.login(this.identifier, this.password, this.rememberMe).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Invalid credentials. Please try again.';
      }
    });
  }
}

