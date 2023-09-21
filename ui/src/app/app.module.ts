import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AuthInterceptor } from './auth/auth.interceptor';
import { LogoutComponent } from './auth/logout/logout.component';
import { DonorComponent } from './admin/donor/donor.component';
import { PatientComponent } from './admin/patient/patient.component';
import { AdminComponent } from './admin/admin/admin.component';
import { BloodGroupPipe } from './shared/blood-group.pipe';
import { DonateBloodComponent } from './donor/donate-blood/donate-blood.component';
import { DonateBloodHistoryComponent } from './donor/donate-blood-history/donate-blood-history.component';
import { StatusPipe } from './shared/status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogoutComponent,
    DonorComponent,
    PatientComponent,
    AdminComponent,
    BloodGroupPipe,
    DonateBloodComponent,
    DonateBloodHistoryComponent,
    StatusPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
