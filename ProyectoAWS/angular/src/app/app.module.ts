import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Importamos AuthGuardService
import { AuthGuardService } from './services/auth-guard.service';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

import { FilterPipe } from './pipes/filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    LoginComponent,
    RegisterComponent,
    UsuariosComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
