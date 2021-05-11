import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    for(const usuario of value) {
      if (usuario.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 ) {
        resultado.push(usuario);
      }
    };
    return resultado;
  }

}
