import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    alert('Registration successful! Please log in.');
    this.router.navigate(['/login']);
  }
}
