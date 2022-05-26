import { Component, OnInit, TemplateRef } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/servicios/api.service';
import { educacion } from 'src/app/models/educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  titulo: String = ""; inicio: String = ""; fin: String = ""; ubicacion: String = ""; descripcion: String = ""; fotoPerfil: String = "";
  educacionList: educacion[] = [];
  educacion!: educacion;

  constructor(private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargaEducacion();
    this.load = true;
  }

  cargaEducacion() {
    return this.apiService.obtenerEducacion().subscribe({
      next: educacion => {
        this.educacionList = educacion;
      }
    })
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModal(EducacionModal: TemplateRef<any>, id: any) {
    this.titulo = ""; this.inicio = ""; this.fin = ""; this.ubicacion = ""; this.descripcion = ""; this.fotoPerfil = "";
    this.apiService.obtenerEducacionID(id).subscribe({
      next: edu => {
        this.educacion = edu;
        this.titulo = this.educacion.titulo;
        this.inicio = this.educacion.inicio;
        this.fin = this.educacion.fin;
        this.ubicacion = this.educacion.ubicacion;
        this.descripcion = this.educacion.descripcion;
        this.fotoPerfil = this.educacion.imagen;
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(EducacionModal);
  }

}
