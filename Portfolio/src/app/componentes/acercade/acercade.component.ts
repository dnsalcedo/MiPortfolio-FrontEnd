import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { acercade } from 'src/app/models/acercade';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  personalDataList!: Observable<acercade[]>;
  personalData!: acercade;
  formEdit!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService, private toastr: ToastrService, public dialogo: MatDialog) {
    this.formEdit = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      presentacion: ['', [Validators.required]],
      fotoPerfil: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      fotoBanner: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      usuarios_idusuario: [''],
    })
  }

  ngOnInit(): void {
    this.cargarInformacionPersonal();
    this.load = true;
  }

  cargarInformacionPersonal() {
    this.personalDataList = this.apiService.obtenerInformacionPersonal().pipe();
  }

  actualizarInformacionPersonal(event: Event) {
    event.preventDefault;
    if (this.formEdit.valid) {
      this.apiService.actualizarInformacionPersonal(this.formEdit.value).subscribe({
        next: (data) => {
          this.modalRef.hide();
          this.ngOnInit();
          this.toastr.success('Registro modificado', '', { progressBar: false });
        },
        error: (err) => {
          this.modalRef.hide();
          this.toastr.error('Sesi??n expirada. Vuelva a iniciar sesi??n.', '', { progressBar: false });
          this.tokenService.logOutError();
        }
      })
    } else {
      this.toastr.error('Error en la validaci??n del formulario. Revisar campos.', '', { progressBar: false });
    }
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
          fotoBanner: this.personalData.fotoBanner,
          usuarios_idusuario: this.personalData.usuarios_idusuario
        })
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(AcercaDeModalEdit);
  }


}
