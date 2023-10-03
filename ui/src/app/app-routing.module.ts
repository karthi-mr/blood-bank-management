import { DonorComponent } from './admin/donor/donor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PatientComponent } from './admin/patient/patient.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DonateBloodComponent } from './donor/donate-blood/donate-blood.component';
import { DonateBloodHistoryComponent } from './donor/donate-blood-history/donate-blood-history.component';
import { DonateEditComponent } from './donor/donate-blood/donate-edit/donate-edit.component';
import { StockComponent } from './admin/stock/stock.component';
import { AddBloodComponent } from './admin/stock/add-blood/add-blood.component';
import { RequestBloodComponent } from './patient/request-blood/request-blood.component';
import { RequestBloodHistoryComponent } from './patient/request-blood-history/request-blood-history.component';
import { RequestEditComponent } from './patient/request-blood/request-edit/request-edit.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { DonorDashboardComponent } from './donor/donor-dashboard/donor-dashboard.component';
import { DonorViewComponent } from './admin/donor/donor-view/donor-view.component';
import { PatientViewComponent } from './admin/patient/patient-view/patient-view.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReleaseNotesComponent } from './shared/release-notes/release-notes.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'admin',
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      {
        path: 'donor',
        children: [
          { path: '', component: DonorComponent },
          { path: ':id', component: DonorViewComponent },
        ],
      },
      {
        path: 'patient',
        children: [
          { path: '', component: PatientComponent },
          { path: ':id', component: PatientViewComponent },
        ],
      },
      { path: 'admin', component: AdminComponent },
      {
        path: 'donate-blood',
        children: [
          { path: '', component: DonateBloodComponent },
          { path: 'history', component: DonateBloodHistoryComponent },
        ],
      },
      {
        path: 'request-blood',
        children: [
          { path: '', component: RequestBloodComponent },
          { path: 'history', component: RequestBloodHistoryComponent },
        ],
      },
      { path: 'blood-stock', component: StockComponent },
      { path: 'add-blood-group', component: AddBloodComponent },
    ],
  },
  {
    path: 'donor',
    children: [
      { path: 'dashboard', component: DonorDashboardComponent },
      {
        path: 'donate-blood',
        children: [
          { path: '', component: DonateBloodComponent },
          { path: 'history', component: DonateBloodHistoryComponent },
          { path: 'add', component: DonateEditComponent },
        ],
      },
      {
        path: 'request-blood',
        children: [
          { path: '', component: RequestBloodComponent },
          { path: 'history', component: RequestBloodHistoryComponent },
          { path: 'add', component: RequestEditComponent },
        ],
      },
    ],
  },
  {
    path: 'patient',
    children: [
      { path: 'dashboard', component: PatientDashboardComponent },
      {
        path: 'request-blood',
        children: [
          { path: '', component: RequestBloodComponent },
          { path: 'history', component: RequestBloodHistoryComponent },
          { path: 'add', component: RequestEditComponent },
        ],
      },
    ],
  },
  { path: 'profile-settings', component: MyProfileComponent },
  { path: 'release-notes', component: ReleaseNotesComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
