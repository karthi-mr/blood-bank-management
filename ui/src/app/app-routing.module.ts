import { DonorComponent } from './admin/donor/donor.component';
import { NgModule, Component } from '@angular/core';
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

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'admin', children: [
    {path: 'donor',component: DonorComponent},
    {path: 'patient',component: PatientComponent},
    {path: 'admin',component: AdminComponent},
    {path: 'blood-donate-details', component: DonateBloodComponent},
    {path: 'donate-blood-history', component: DonateBloodHistoryComponent},
    {path: 'blood-stock', component: StockComponent},
    {path: 'add-blood-group', component: AddBloodComponent},
  ]},
  {path: 'donor', children: [
    {path: 'donate-blood', component: DonateBloodComponent},
    {path: 'donate-blood-history', component: DonateBloodHistoryComponent},
    {path: 'donate-blood-add', component: DonateEditComponent},
  ]},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
