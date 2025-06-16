import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { CourtTypesComponent } from './pages/court-types/court-types.component';
import { PricingComponent } from './pages/pricing/pricing.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register',        component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'court-types', component: CourtTypesComponent },
    { path: 'pricing', component: PricingComponent },
  // { path: 'dashboard', component: DashboardComponent },  etc.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
