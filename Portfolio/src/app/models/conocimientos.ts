export class conocimientos {
    id?: number;
    texto: string;
    usuarios_idusuario: string;

    constructor(texto: string, usuarios_idusuario: string) {
        this.texto = texto;
        this.usuarios_idusuario = usuarios_idusuario;
    }
}