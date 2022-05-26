import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { acercade } from 'src/app/models/acercade';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  personalDataList: acercade[] = [];
  personalData!: acercade;
  formEdit!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService, private toastr: ToastrService, public dialogo: MatDialog) { 
    this.formEdit = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      presentacion: ['', [Validators.required]],
      fotoPerfil: [''],
      usuarios_idusuario: [''],
    })
  }

  ngOnInit(): void {
    this.cargarInformacionPersonal();
    this.load = true;
  }

  cargarInformacionPersonal() {
    return this.apiService.obtenerInformacionPersonal().subscribe({
      next: personalData => {
        this.personalDataList = personalData;
      }
    })
  }

  actualizarInformacionPersonal(event: Event) {
    event.preventDefault;
    this.apiService.actualizarInformacionPersonal(this.formEdit.value).subscribe({
      next: (data) => {
        this.modalRef.hide();
        this.ngOnInit();
        this.toastr.success('Registro modificado', '', { progressBar: false });
      },
      error: (err) => {
        this.modalRef.hide();
        this.toastr.error('Sesión expirada. Vuelva a iniciar sesión.', '', { progressBar: false });
        this.tokenService.logOutError();
      }
    })
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModalEdit(AcercaDeModalEdit: TemplateRef<any>) {
    this.apiService.obtenerInformacionPersonal().subscribe({
      next: info => {
        this.personalData = info[0];
        this.formEdit.patchValue({
          id: this.personalData.id,
          nombre: this.personalData.nombre,
          presentacion: this.personalData.presentacion,
          fotoPerfil: this.personalData.fotoPerfil,
          usuarios_idusuario: this.personalData.usuarios_idusuario
        })
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(AcercaDeModalEdit);
  }


}
