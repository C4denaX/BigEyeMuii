import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Usuario } from '../models/usuario';
import { Auth, Hub, Logger } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUsuario: Usuario;
  usuarios: any;
  token: string = "";
  readonly URL_API = 'http://localhost:3000/usuarios/';
  // readonly URL_API_AWS = '';
  // readonly URL_API = 'http://localhost:27050/usuarios';

  constructor(private http: HttpClient) { 
    this.selectedUsuario = new Usuario();
    this.usuarios = [];
  }

  // getUsuarios() {
  //   return this.http.get(this.URL_API);
  // }

  getUsuarios() {
    this.testAPICall()
    // alert(this.testAPICall());

    const headers = new HttpHeaders({'Authorization': "Bearer ".concat(localStorage.getItem('TOKEN') || '{}')});
    return this.http.get("https://4508do0acj.execute-api.us-east-1.amazonaws.com/users", {headers: headers})
    
  }

  createUsuario(usuario_a_registrar: any) {
    var dataUser = {
      "name": usuario_a_registrar.nombre,
      "thumbnail": usuario_a_registrar.foto
    }

    const headers = new HttpHeaders({'Authorization': "Bearer ".concat(localStorage.getItem('TOKEN') || '{}')});
    return this.http.post("https://4508do0acj.execute-api.us-east-1.amazonaws.com/users", dataUser, {headers: headers});
  }


  getJwtToken(): Promise<string | void> {
    return Auth.currentSession()
      .then(session => session.getIdToken().getJwtToken())
      .catch(err => console.log(err));
  }

  testAPICall(): void {
    var promesa = Promise.resolve(this.getJwtToken())

    promesa.then(function(value) {
      localStorage.setItem("TOKEN", (value || '{}'));
    });
  }

}
