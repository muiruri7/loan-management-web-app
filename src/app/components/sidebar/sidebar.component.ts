import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isCollapsed = false;

  menuItems = [
    { label: '🏠 Dashboard', link: '/dashboard' },
    { label: '👥 Customers', link: '/customers' },
    { label: '💰 Loans', link: '/loans' },
    { label: '📊 Charts', link: '/mycharts' }
  ];
  

  constructor(private authService: AuthService, private router: Router) {
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  
  logout() {
    if (confirm('Are you sure you want to log out?')) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
