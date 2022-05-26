export class acercade {
    id?: number;
    nombre: string;
    presentacion: string;
    fotoPerfil: string;
    usuarios_idusuario: string;

    constructor(nombre: string, presentacion: string, fotoPerfil: string, usuarios_idusuario: string) {
        this.nombre = nombre;
        this.presentacion = presentacion;
        this.fotoPerfil = fotoPerfil;
        this.usuarios_idusuario = usuarios_idusuario;
    }
}