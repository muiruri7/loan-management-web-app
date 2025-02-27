import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout();
      this.user = ''; // Clear user name
      this.router.navigate(['/login']);
    }
  }
}
