import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { CustomerListComponent } from './pages/customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './pages/customers/customer-form/customer-form.component';
import { LoanListComponent } from './pages/loans/loan-list/loan-list.component';
import { LoanFormComponent } from './pages/loans/loan-form/loan-form.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { AuthService } from './services/auth.service';
import { CustomerService } from './services/customer.service';
import { LoanService } from './services/loan.service';
import { AuthGuard } from './guards/auth.guard';
import { MychartsComponent } from './components/my-charts/my-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    CustomerListComponent,
    CustomerFormComponent,
    LoanListComponent,
    LoanFormComponent,
    DashboardComponent,
    MychartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, CustomerService, LoanService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
