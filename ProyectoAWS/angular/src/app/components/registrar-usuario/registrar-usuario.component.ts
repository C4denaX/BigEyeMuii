import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators, Form, FormBuilder, FormArray, NgForm  } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.scss']
})

export class RegistrarUsuarioComponent implements OnInit {

  formularioRegistro: FormGroup; // Declaramos nuestro formulario.
  imagen_codificada!: string;
  cargando: Boolean = false;  


  constructor(private sanitizer: DomSanitizer, public usuarioService: UsuarioService, private formBuilder: FormBuilder) {
    this.formularioRegistro = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      foto: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
  }

  registrar() {
    this.cargando = true;
    this.usuarioService.createUsuario(this.formularioRegistro.value)
      .subscribe(res => {
        this.cargando = false;
        //alert(Object.values(res));
        location.reload();
      },
      err => {
        this.cargando = false;
        //alert(Object.values(err));
        location.reload();
      })
  }


  // Capturamos el evento de "subir una foto". Al subir una foto, es decir, seleccionarla
  // desde nuestros archivos, se ejecutará esta función, que lo que hace es obtener el archivo
  // que se ha subido desde el evento, y luego llamar a la función extraerBase64(), para que nos
  // devuelva la imagen codificada en Base64.
  capturarFile(event: any) : any {
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.imagen_codificada = imagen.base;
      this.formularioRegistro.value.foto = this.imagen_codificada;
      this.formularioRegistro.value.foto = this.formularioRegistro.value.foto.replace(/^data:image\/[a-z]+;base64,/, "");
      
    })
  }



  // Convertimos el evento (imagen) a Base64.
  extraerBase64 = async($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return null;

    } catch(e) {
      return null;
    }
  })


  

}
