export class proyectos {
    id?: number;
    titulo: string;
    inicio: string;
    fin: string;
    ubicacion: string;
    descripcion: string;
    imagen: string;
    usuarios_idusuario: string;

    constructor(titulo: string, inicio: string, fin: string, ubicacion: string, descripcion: string, imagen: string, usuarios_idusuario: string) {
        this.titulo = titulo;
        this.inicio = inicio;
        this.fin = fin;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.ubicacion = ubicacion;
        this.usuarios_idusuario = usuarios_idusuario;
    }
}