import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/dashboard']); // Redirect if already logged in
    }
  }

  onRegister() {
    this.authService.register(this.first_name, this.last_name, this.email, this.password)
      .subscribe({
        next: (response: any) => {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        },
        error: (error: { error: { message: string; }; }) => {
          this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        }
      });
  }
}
