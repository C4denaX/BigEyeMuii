import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Usuario } from '../models/usuario';
import { Auth, Hub, Logger } from 'aws-amplify';
import { environment } from '../../environments/environment';


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

  getUsuarios(token : any) {
    return this.http.get(environment.UsersApiEndpoint, {headers: new HttpHeaders({'Authorization': "Bearer ".concat(token)})})
  }

  createUsuario(usuario_a_registrar: any, token: any) {
    var dataUser = {
      "name": usuario_a_registrar.nombre,
      "thumbnail": usuario_a_registrar.foto
    }
    return this.http.post(environment.UsersApiEndpoint, dataUser, {headers: new HttpHeaders({'Authorization': "Bearer ".concat(token)})});
  }


  getJwtToken(): Promise<string | any> {
    return Auth.currentSession()
      .then(session => session.getIdToken().getJwtToken())
      .catch(err => console.log(err));
  }




}
