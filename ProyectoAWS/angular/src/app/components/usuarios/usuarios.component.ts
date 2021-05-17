import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService]
})
export class UsuariosComponent implements OnInit {
  
  accesos_modal!: Array<any>
  usuario_modal!: string;
  filterUsuario = '';
  modalRef! : BsModalRef;
  cargando : Boolean = false;


  constructor(public usuarioService: UsuarioService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  // getUsuarios() PARA NODEJS
  // getUsuarios() {
  //   this.usuarioService.getUsuarios()
  //     .subscribe(res => {
  //       this.usuarioService.usuarios = res as Usuario[];
  //     });
  // }

  // getUsuarios() PARA DYNAMODB
  getUsuarios() {
    this.cargando = true;
    this.usuarioService.getUsuarios()
      .subscribe(res => {
        this.cargando = false;
        this.usuarioService.usuarios = Object.values(res)[0];
        console.log(this.usuarioService.usuarios);
      })
  }


  verTodos(template: TemplateRef<any>, accesos: Object, usuario: string) {
    this.usuario_modal = usuario;
    this.accesos_modal = Object.values(accesos);
    this.modalRef = this.modalService.show(template, {class: 'modal-dialog'});
  }


  json_to_array(accesos: Object): Array<any> {
    var accesos_array: Array<any>;
    accesos_array = Object.values(accesos);
    return accesos_array
  }

}
