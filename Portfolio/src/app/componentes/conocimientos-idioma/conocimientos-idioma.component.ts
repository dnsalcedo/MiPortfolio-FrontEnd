import { Component, OnInit, TemplateRef } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/servicios/api.service';
import { idiomas } from 'src/app/models/idiomas';

@Component({
  selector: 'app-conocimientos-idioma',
  templateUrl: './conocimientos-idioma.component.html',
  styleUrls: ['./conocimientos-idioma.component.css']
})
export class ConocimientosIdiomaComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  nombre: String = ""; nivelLectura: String = ""; nivelEscritura: String = ""; nivelConversacion: String = "";
  idiomasList: idiomas[] = [];
  idioma!: idiomas;

  constructor(private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarIdiomas();
    this.load = true;
  }

  cargarIdiomas() {
    return this.apiService.obtenerIdiomas().subscribe({
      next: idiomas => {
        this.idiomasList = idiomas;
      }
    })
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModal(IdiomasModal: TemplateRef<any>, id: any) {
    this.nombre = ""; this.nivelEscritura = ""; this.nivelLectura = ""; this.nivelConversacion = "";
    this.apiService.obtenerIdiomaID(id).subscribe({
      next: idi => {
        this.idioma = idi;
        this.nombre = this.idioma.nombre;
        this.nivelEscritura = this.idioma.nivelEscritura;
        this.nivelLectura = this.idioma.nivelLectura;
        this.nivelConversacion = this.idioma.nivelConversacion;
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(IdiomasModal);
  }


}
