import { Component, OnInit, TemplateRef } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/servicios/api.service';
import { acercade } from 'src/app/models/acercade';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  load: boolean = false;
  modalRef!: BsModalRef;
  nombre: String = "";
  presentacion: String = "";
  fotoPerfil: String = "";
  personalDataList: acercade[] = [];


  constructor(private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarInformacionPersonal();
  }

  cargarInformacionPersonal() {
    return this.apiService.obtenerInformacionPersonal().subscribe({
      next: personalData => {
        this.personalDataList = personalData;
      }
    })
  }

  actualizarInformacionPersonal(info: acercade) {
    console.log(info.nombre);
    console.log(info.presentacion);
    console.log(info.fotoPerfil);
  }

  crearInformacionPersonal(info: acercade) {
    console.log(info.nombre);
    console.log(info.presentacion);
    console.log(info.fotoPerfil);
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModal(InformacionPersonalModal: TemplateRef<any>) {
    this.nombre = this.personalDataList[0].nombre;
    this.presentacion = this.personalDataList[0].presentacion;
    this.fotoPerfil = this.personalDataList[0].fotoPerfil;
    this.modalRef = this.modalService.show(InformacionPersonalModal);
  }

}
