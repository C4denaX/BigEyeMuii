import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Add Amplify imports */
import Amplify from 'aws-amplify';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

/* Configure Amplify resources */
Amplify.configure({
  region: 'us-east-1',
  userPoolId: 'us-east-1_gHvdWWyZb',
  userPoolWebClientId: '16dqad02dt01tdreihh5le382v'
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule  // Add AmplifyUI module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
