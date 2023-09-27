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

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'admin', children: [
    {path: 'dashboard',component: AdminDashboardComponent},
    {path: 'donor',component: DonorComponent},
    {path: 'patient',component: PatientComponent},
    {path: 'admin',component: AdminComponent},
    {path: 'donate-blood', component: DonateBloodComponent},
    {path: 'donate-blood/history', component: DonateBloodHistoryComponent},
    {path: 'blood-stock', component: StockComponent},
    {path: 'add-blood-group', component: AddBloodComponent},
    {path: 'request-blood', component: RequestBloodComponent},
    {path: 'request-blood/history', component: RequestBloodHistoryComponent},
  ]},
  {path: 'donor', children: [
    {path: 'dashboard',component: DonorDashboardComponent},
    {path: 'donate-blood', component: DonateBloodComponent},
    {path: 'donate-blood/history', component: DonateBloodHistoryComponent},
    {path: 'donate-blood/add', component: DonateEditComponent},
    {path: 'request-blood', component: RequestBloodComponent},
    {path: 'request-blood/history', component: RequestBloodHistoryComponent},
    {path: 'request-blood/add', component: RequestEditComponent},
  ]},
  {path: 'patient', children: [
    {path: 'dashboard',component: PatientDashboardComponent},
    {path: 'request-blood', component: RequestBloodComponent},
    {path: 'request-blood/history', component: RequestBloodHistoryComponent},
    {path: 'request-blood/add', component: RequestEditComponent},
  ]},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
