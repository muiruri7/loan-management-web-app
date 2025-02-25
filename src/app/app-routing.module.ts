import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/customers/customer-form/customer-form.component';
import { LoanListComponent } from './pages/loans/loan-list/loan-list.component';
import { LoanFormComponent } from './pages/loans/loan-form/loan-form.component';
import { MyChartsComponent } from './components/my-charts/my-charts.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add', component: CustomerFormComponent },
  { path: 'customer/edit/:id', component: CustomerFormComponent },
  { path: 'loans', component: LoanListComponent },
  { path: 'loans/add', component: LoanFormComponent,  },
  { path: 'loans/edit/:id', component: LoanFormComponent },
  { path: 'my-charts', component: MyChartsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
