import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LogoutComponent } from './auth/logout/logout.component';
import { DonorComponent } from './admin/donor/donor.component';
import { PatientComponent } from './admin/patient/patient.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DonateBloodComponent } from './donor/donate-blood/donate-blood.component';
import { DonateBloodHistoryComponent } from './donor/donate-blood-history/donate-blood-history.component';
import { StatusPipe } from './shared/status.pipe';
import { DonateEditComponent } from './donor/donate-blood/donate-edit/donate-edit.component';
import { StockComponent } from './admin/stock/stock.component';
import { AddBloodComponent } from './admin/stock/add-blood/add-blood.component';
import { RequestBloodComponent } from './patient/request-blood/request-blood.component';
import { RequestBloodHistoryComponent } from './patient/request-blood-history/request-blood-history.component';
import { RequestEditComponent } from './patient/request-blood/request-edit/request-edit.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { DonorDashboardComponent } from './donor/donor-dashboard/donor-dashboard.component';
import { CustomDatePipe } from './shared/custom-date.pipe';
import { DashBoxComponent } from './shared/dash-box/dash-box.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DonorViewComponent } from './admin/donor/donor-view/donor-view.component';
import { EmptyDataPipe } from './shared/empty-data.pipe';
import { PatientViewComponent } from './admin/patient/patient-view/patient-view.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReleaseNotesComponent } from './shared/release-notes/release-notes.component';
import { RejectRequestComponent } from './shared/reject-request/reject-request.component';
import { RequestDetailViewComponent } from './patient/request-blood-history/request-detail-view/request-detail-view.component';
import { DonateDetailViewComponent } from './donor/donate-blood-history/donate-detail-view/donate-detail-view.component';
import { AboutUsComponent } from './shared/about-us/about-us.component';
import { HelpDocsComponent } from './shared/help-docs/help-docs.component';
import { BloodGroupComponent } from './shared/dash-box/blood-group/blood-group.component';

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
    DonateBloodComponent,
    DonateBloodHistoryComponent,
    StatusPipe,
    DonateEditComponent,
    StockComponent,
    AddBloodComponent,
    RequestBloodComponent,
    RequestBloodHistoryComponent,
    RequestEditComponent,
    AdminDashboardComponent,
    PatientDashboardComponent,
    DonorDashboardComponent,
    CustomDatePipe,
    DashBoxComponent,
    LoadingComponent,
    DonorViewComponent,
    EmptyDataPipe,
    PatientViewComponent,
    MyProfileComponent,
    ReleaseNotesComponent,
    RejectRequestComponent,
    RequestDetailViewComponent,
    DonateDetailViewComponent,
    AboutUsComponent,
    HelpDocsComponent,
    BloodGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
