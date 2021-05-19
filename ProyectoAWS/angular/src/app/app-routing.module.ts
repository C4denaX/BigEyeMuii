import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuardService } from './services/auth-guard.service';

// RUTAS PARA LA VERSIÓN CON NODEJS
// const routes: Routes = [
//   { path:'', component: LoginComponent, canActivate: [AuthGuardService] },
//   { path:'register', component: RegisterComponent, canActivate: [AuthGuardService] },
//   { path:'employees', component: EmployeesComponent, canActivate: [AuthGuardService] },
//   { path:'usuarios', component: UsuariosComponent, canActivate: [AuthGuardService] },
//   { path:'registrarUsuario', component: RegistrarUsuarioComponent, canActivate: [AuthGuardService] }
// ];

const routes: Routes = [
  { path:'', component: BienvenidaComponent },
  { path:'usuarios', component: UsuariosComponent },
  { path:'employees', component: EmployeesComponent },
  { path:'registrarUsuario', component: RegistrarUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
