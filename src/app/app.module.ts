// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor } from './interceptors/jwt.interceptor';  // ← importa tu interceptor
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { CourtTypesComponent } from './pages/court-types/court-types.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HorarioService } from './services/horario.service';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';
import { ReservaListComponent } from './components/reserva-list/reserva-list.component';
import { ReportesComponent } from './pages/reportes/reportes.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    RegisterComponent,
    ScheduleComponent,
    CourtTypesComponent,
    PricingComponent,
    ReservasComponent,
    ReservaFormComponent,
    ReservaListComponent,
    ReportesComponent,
    FacturacionComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
