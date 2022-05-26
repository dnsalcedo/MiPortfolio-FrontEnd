import { Component, OnInit, TemplateRef } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { ApiService } from 'src/app/servicios/api.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { proyectos } from 'src/app/models/proyectos';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  titulo: String = ""; inicio: String = ""; fin: String = ""; ubicacion: String = ""; descripcion: String = ""; fotoPerfil: String = "";
  proyectosList: proyectos[] = [];
  proyecto!: proyectos;

  constructor(private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.load = true;
  }

  cargarProyectos() {
    return this.apiService.obtenerProyectos().subscribe({
      next: proyectos => {
        this.proyectosList = proyectos;
      }
    })
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModal(ProyectosModal: TemplateRef<any>, id: any) {
    this.titulo = ""; this.inicio = ""; this.fin = ""; this.ubicacion = ""; this.descripcion = ""; this.fotoPerfil = "";
    this.apiService.obtenerProyectoID(id).subscribe({
      next: pro => {
        this.proyecto = pro;
        this.titulo = this.proyecto.titulo;
        this.inicio = this.proyecto.inicio;
        this.fin = this.proyecto.fin;
        this.ubicacion = this.proyecto.ubicacion;
        this.descripcion = this.proyecto.descripcion;
        this.fotoPerfil = this.proyecto.imagen;
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(ProyectosModal);
  }

}
