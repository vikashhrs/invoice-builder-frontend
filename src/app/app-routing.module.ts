import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/components/auth/auth.component';
import { NoAuthGaurdService } from './core/services/no-auth-gaurd.service';

const routes: Routes = [
  {path: 'login' , component: AuthComponent, canActivate: [NoAuthGaurdService]},
  {path: 'signup' , component: AuthComponent, canActivate: [NoAuthGaurdService]},
  { path: '', component: AppComponent },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
