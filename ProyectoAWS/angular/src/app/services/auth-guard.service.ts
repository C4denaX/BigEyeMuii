import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  var: Boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(state.url != "/") {
      if (localStorage.getItem("ACCESS_TOKEN")) {
        return true;
      } else {
        this.router.navigate(["/"])
        return false;
      }
    } else {
      if (localStorage.getItem("ACCESS_TOKEN")) {
        this.router.navigate(["/employees"])
        return false;
      } else {
        return true;
      }
    }


  }


}
