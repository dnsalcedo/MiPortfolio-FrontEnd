import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
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
  idiomasList: idiomas[] = [];
  idioma!: idiomas;
  formEdit!: FormGroup;
  formNew!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService, private toastr: ToastrService, public dialogo: MatDialog) {
    this.formEdit = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      nivelLectura: ['', [Validators.required]],
      nivelEscritura: ['', [Validators.required]],
      nivelConversacion: ['', [Validators.required]],
      usuarios_idusuario: [''],
    })
    this.formNew = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      nivelLectura: ['', [Validators.required]],
      nivelEscritura: ['', [Validators.required]],
      nivelConversacion: ['', [Validators.required]],
      usuarios_idusuario: [''],
    })
  }

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

  actualizarConocimiento(event: Event) {
    event.preventDefault;
    this.apiService.actualizarIdioma(this.formEdit.value).subscribe({
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

  crearConocimiento(event: Event) {
    event.preventDefault;
    this.apiService.crearIdioma(this.formNew.value).subscribe({
      next: (data) => {
        this.modalRef.hide();
        this.ngOnInit();
        this.toastr.success('Registro creado exitosamente', '', { progressBar: false });
      },
      error: (err) => {
        this.modalRef.hide();
        this.toastr.error('Sesión expirada. Vuelva a iniciar sesión.', '', { progressBar: false });
        this.tokenService.logOutError();
      }
    })
  }

  openModalEdit(IdiomaModalEdit: TemplateRef<any>, id: any) {
    this.apiService.obtenerIdiomaID(id).subscribe({
      next: idi => {
        this.idioma = idi;
        this.formEdit.patchValue({
          id: this.idioma.id,
          nombre: this.idioma.nombre,
          nivelLectura: this.idioma.nivelLectura,
          nivelEscritura: this.idioma.nivelEscritura,
          nivelConversacion: this.idioma.nivelConversacion,
          usuarios_idusuario: this.idioma.usuarios_idusuario
        })
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(IdiomaModalEdit);
  }

  openModalNew(IdiomaModalNew: TemplateRef<any>) {
    this.formNew.patchValue({
      nombre: "",
      nivelLectura: "",
      nivelEscritura: "",
      nivelConversacion: "",
      usuarios_idusuario: "1"
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(IdiomaModalNew);
  }


  mostrarDialogo(id: any): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Está seguro de que desea eliminar el registro?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.apiService.eliminarIdioma(id).subscribe({
            next: data => {
              this.ngOnInit();
            },
            error: (err) => {
              this.tokenService.logOutError();
              this.router.navigate(['/login']);
              this.toastr.error('Sesión expirada. Vuelva a iniciar sesión.', '', { progressBar: false });
            }
          })
        }
      });
  }


}
