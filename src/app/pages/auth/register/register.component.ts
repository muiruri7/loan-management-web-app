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
    if (this.authService.register(this.first_name, this.last_name, this.email, this.password)) {
      alert('Registration successful! Please log in.');
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Email already exists.';
    }
  }
}
