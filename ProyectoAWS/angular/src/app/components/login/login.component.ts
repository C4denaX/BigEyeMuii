import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form, FormBuilder, FormArray, NgForm  } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router';
import { JwtResponse } from 'src/app/models/jwt-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})

export class LoginComponent implements OnInit {
  formularioLogin: FormGroup; // Declaramos nuestro formulario.
  authError: Boolean;   // Variable para controlar los errores de autentificación.


  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private router: Router) {
      this.authError = false;
      this.formularioLogin = this.formBuilder.group({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
  }

  ngOnInit(): void {
  }


  // LOGIN
  login() {
    this.authService.login(this.formularioLogin.value)
      .subscribe(
        res => {
          this.authError = false;
          this.router.navigate(['usuarios']);
        },
        error => {
          console.log("Error de autentificación");
          this.authError = true;
          this.resetForm();
        }
      )
  }






  // RESETEAR FORMULARIO
  resetForm() {
      this.formularioLogin.reset();
      this.authService.selectedUsuario = new User();
  }

}
