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
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';

/* Add Amplify imports */
import Amplify from 'aws-amplify';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

/* Configure Amplify resources */
// Amplify.configure({
//   region: 'us-east-1',
//   userPoolId: 'us-east-1_gHvdWWyZb',
//   userPoolWebClientId: '16dqad02dt01tdreihh5le382v'
// });
Amplify.configure({
  region: 'us-east-1',
  userPoolId: 'us-east-1_AzEXK5bTu',
  userPoolWebClientId: '2jnq087nl45lrraipb5qeqahno'
});


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    LoginComponent,
    RegisterComponent,
    UsuariosComponent,
    FilterPipe,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    AmplifyUIAngularModule  // Add AmplifyUI module
  ],
  providers: [
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
