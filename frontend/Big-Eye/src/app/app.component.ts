import { Component } from '@angular/core';
import { Auth, Hub, Logger } from 'aws-amplify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Big-Eye';

  constructor() {
    const listener = (data: any) => console.log(data);
    Hub.listen('auth', listener);
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
}
