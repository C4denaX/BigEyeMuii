export class Usuario {
    constructor(faceID="", nombre="", foto="", accesos=[]) {
        this.faceID=faceID;
        this.nombre=nombre;
        this.foto=foto;
        this.accesos=accesos;
    }

    faceID: string;
    nombre: string;
    foto: string;
    accesos: Array<any>;
}
