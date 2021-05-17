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
  // readonly URL_API = 'http://localhost:27050/usuarios';

  constructor(private http: HttpClient) { 
    this.selectedUsuario = new Usuario();
    this.usuarios = [];
  }

  // getUsuarios() {
  //   return this.http.get(this.URL_API);
  // }

  getUsuarios() {
    return this.http.get("https://1o9tlkqjzl.execute-api.us-east-1.amazonaws.com/dev/users")
    
  }

  createUsuario(usuario_a_registrar: any) {
    var dataUser = {
      "name": usuario_a_registrar.nombre,
      "thumbnail": usuario_a_registrar.foto
    }

    return this.http.post("https://1o9tlkqjzl.execute-api.us-east-1.amazonaws.com/dev/users", dataUser);
  }

}
