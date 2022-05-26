export class idiomas {
    id?: number;
    nombre: string;
    nivelLectura: string;
    nivelEscritura: string;
    nivelConversacion: string;
    usuarios_idusuario: string;

    constructor(nombre: string, nivelLectura: string, nivelEscritura: string, nivelConversacion: string, usuarios_idusuario: string) {
        this.nombre = nombre;
        this.nivelLectura = nivelLectura;
        this.nivelEscritura = nivelEscritura;
        this.nivelConversacion = nivelConversacion;
        this.usuarios_idusuario = usuarios_idusuario;
    }
}