import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  user: string = '';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
    this.role = this.authService.getUserRole();
  }

  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
