import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path:'', component: LoginComponent, canActivate: [AuthGuardService] },
  { path:'register', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path:'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
  { path:'usuarios', component: UsuariosComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
