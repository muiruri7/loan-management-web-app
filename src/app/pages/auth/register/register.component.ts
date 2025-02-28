import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, finalize, retry } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  first_name = '';
  last_name = '';
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;  // ✅ Added loading state

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/dashboard']); // Redirect if already logged in
    }
  }

  onRegister() {
    this.isLoading = true;  // ✅ Show loading state
    this.errorMessage = '';

    this.authService.register(this.first_name, this.last_name, this.email, this.password)
      .pipe(
        retry(2), // ✅ Automatically retry up to 2 times before failing
        catchError((error) => {
          console.error('Registration Failed:', error);
          if (error.status === 0) {
            this.errorMessage = 'Cannot connect to the server. Please check your network.';
          } else {
            this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
          }
          return of(null);
        }),
        finalize(() => this.isLoading = false) // ✅ Hide loading state after request finishes
      )
      .subscribe((response) => {
        if (response) {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        }
      });
  }
}
