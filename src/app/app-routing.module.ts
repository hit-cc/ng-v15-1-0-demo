import { ForgotPasswordComponent } from './core/components/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { MaintenanceComponent } from './core/components/maintenance/maintenance.component';
import { ErrorComponent } from './core/components/error/error.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { VerifyEmailComponent } from './core/components/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'register-user',
    component: RegisterComponent,
  },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
