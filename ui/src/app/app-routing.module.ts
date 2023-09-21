import { DonorComponent } from './admin/donor/donor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { PatientComponent } from './admin/patient/patient.component';
import { AdminComponent } from './admin/admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'admin', children: [
    {path: 'donor',component: DonorComponent},
    {path: 'patient',component: PatientComponent},
    {path: 'admin',component: AdminComponent},
  ]},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
