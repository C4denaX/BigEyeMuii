import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  selectedUsuario: Usuario;
  usuarios: any;
  readonly URL_API = 'http://localhost:3000/usuarios/';
  // readonly URL_API_AWS = '';
  // readonly URL_API = 'http://localhost:27050/usuarios'

  constructor(private http: HttpClient) { 
    this.selectedUsuario = new Usuario();
    this.usuarios = [];
  }

  // getUsuarios() {
  //   return this.http.get(this.URL_API);
  // }

  getUsuarios() {
    this.http.get("https://cdljq8eipl.execute-api.us-east-1.amazonaws.com/dev/users")
    .subscribe(res => {
      this.usuarios = Object.values(res)[0];
      console.log(this.usuarios);
    })
  }

  createUsuario(usuario_a_registrar: any) {
    var dataUser = {
      "name": usuario_a_registrar.nombre,
      "thumbnail": usuario_a_registrar.foto
    }

    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };

    return this.http.post("https://frwofkrya1.execute-api.us-east-1.amazonaws.com/dev/user", dataUser, HTTP_OPTIONS);
  }

}
