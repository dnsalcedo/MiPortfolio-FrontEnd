import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { experiencias } from 'src/app/models/experiencias';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  experienciasList: experiencias[] = [];
  experiencia!: experiencias;
  formEdit!: FormGroup;
  formNew!: FormGroup;
  titulo_2: String = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService, private toastr: ToastrService, public dialogo: MatDialog) {
    this.formEdit = this.formBuilder.group({
      id: [''],
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: [''],
      ubicacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: [''],
      usuarios_idusuario: [''],
    })
    this.formNew = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: [''],
      ubicacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: [''],
      usuarios_idusuario: [''],
    })
  }

  ngOnInit(): void {
    this.cargarExperiencias();
    this.load = true;
  }

  cargarExperiencias() {
    return this.apiService.obtenerExperiencias().subscribe({
      next: experiencias => {
        this.experienciasList = experiencias;
      }
    })
  }

  actualizarExperiencia(event: Event) {
    event.preventDefault;
    this.apiService.actualizarExperiencia(this.formEdit.value).subscribe({
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

  crearExperiencia(event: Event) {
    event.preventDefault;
    this.apiService.crearExperiencia(this.formNew.value).subscribe({
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

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModalEdit(ExperienciaModalEdit: TemplateRef<any>, id: any) {
    this.apiService.obtenerExperienciaID(id).subscribe({
      next: exp => {
        this.experiencia = exp;
        this.formEdit.patchValue({
          id: this.experiencia.id,
          titulo: this.experiencia.titulo,
          inicio: this.experiencia.inicio,
          fin: this.experiencia.fin,
          ubicacion: this.experiencia.ubicacion,
          descripcion: this.experiencia.descripcion,
          imagen: this.experiencia.imagen,
          usuarios_idusuario: this.experiencia.usuarios_idusuario
        })
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(ExperienciaModalEdit);
  }

  openModalNew(ExperienciaModalNew: TemplateRef<any>) {
    this.formNew.patchValue({
      id: "",
      titulo: "",
      inicio: "",
      fin: "",
      ubicacion: "",
      descripcion: "",
      imagen: "",
      usuarios_idusuario: "1"
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(ExperienciaModalNew);
  }


  mostrarDialogo(id: any): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Está seguro de que desea eliminar el registro?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.apiService.eliminarExperiencia(id).subscribe({
            next: data => {
              this.ngOnInit();
            },
            error: (err) => {
              this.router.navigate(['/login']);
              this.toastr.error('Sesión expirada. Vuelva a iniciar sesión.', '', { progressBar: false });
            }
          })
        }
      });
  }

}
