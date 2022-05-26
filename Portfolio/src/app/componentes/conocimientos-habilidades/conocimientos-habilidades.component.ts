import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CdkDragDrop, moveItemInArray, } from '@angular/cdk/drag-drop';
import { TokenService } from 'src/app/servicios/token.service';
import { ApiService } from 'src/app/servicios/api.service';
import { conocimientos } from 'src/app/models/conocimientos';

@Component({
  selector: 'app-conocimientos-habilidades',
  templateUrl: './conocimientos-habilidades.component.html',
  styleUrls: ['./conocimientos-habilidades.component.css']
})
export class ConocimientosHabilidadesComponent implements OnInit {
  array = [];
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  texto: String = ""
  conocimientosList: conocimientos[] = [];
  conocimiento!: conocimientos;

  constructor(private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarConocimientos();
    this.load = true;
  }

  cargarConocimientos() {
    return this.apiService.obtenerConocimientos().subscribe({
      next: conocimientos => {
        this.conocimientosList = conocimientos;
      }
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.array, event.previousIndex, event.currentIndex);
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModal(ConocimientosModal: TemplateRef<any>, id: any) {
    this.texto = "";
    this.apiService.obtenerConocimientosID(id).subscribe({
      next: con => {
        this.conocimiento = con;
        this.texto = this.conocimiento.texto;
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(ConocimientosModal);
  }

}
