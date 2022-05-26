import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
//import { GuardService } from './servicios/guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/portfolio', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'portfolio', component: HomeComponent },
  { path: '**', redirectTo: '/portfolio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
