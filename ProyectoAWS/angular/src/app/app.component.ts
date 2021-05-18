import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth, Hub, Logger } from 'aws-amplify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular';

  email: string = "";
  userName: any = localStorage.getItem("CognitoIdentityServiceProvider.16dqad02dt01tdreihh5le382v.LastAuthUser")

  constructor (private authService: AuthService) {
    const listener = (data: any) => console.log(data);
    Hub.listen('auth', listener);
  }


  ngOnInit(): void {
    //this.testAPICall();
  }

  private getJwtToken(): Promise<string | void> {
    return Auth.currentSession()
      .then(session => session.getIdToken().getJwtToken())
      .catch(err => console.log(err));
  }

  public testAPICall(): void {
    this.getJwtToken()
      .then(console.log);
  }







  // Función que nos devuelve si el usuario está logueado o no dependiendo si
  // existe el ACCESS_TOKEN.
  usuarioLogueado() : Boolean {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      this.email = localStorage.getItem('EMAIL')!;
      return true;
    } else {
      return false;
    }
  }


  cerrarSesion() {
    this.authService.logout();
  }

}
