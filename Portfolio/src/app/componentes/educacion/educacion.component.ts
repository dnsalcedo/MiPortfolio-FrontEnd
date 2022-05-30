import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { educacion } from 'src/app/models/educacion';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})

export class EducacionComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  educacionList!: Observable<educacion[]>;
  educacion!: educacion;
  formEdit!: FormGroup;
  formNew!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService, private toastr: ToastrService, public dialogo: MatDialog) {
    this.formEdit = this.formBuilder.group({
      id: [''],
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: [''],
      ubicacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      usuarios_idusuario: [''],
    })
    this.formNew = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      inicio: ['', [Validators.required]],
      fin: [''],
      ubicacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
      usuarios_idusuario: [''],
    })
  }

  ngOnInit(): void {
    this.cargaEducacion();
    this.load = true;
  }

  cargaEducacion() {
    this.educacionList = this.apiService.obtenerEducacion().pipe(
      tap(educacion => {
        educacion.sort((a, b) =>
          new Date(b.inicio).getTime() - new Date(a.inicio).getTime()
        );
      })
    );
  }

  actualizarEducacion(event: Event) {
    event.preventDefault;
    if (this.formEdit.valid) {
      this.apiService.actualizarEducacion(this.formEdit.value).subscribe({
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
    } else {
      this.toastr.error('Error en la validación del formulario. Revisar campos.', '', { progressBar: false });
    }
  }

  crearEducacion(event: Event) {
    event.preventDefault;
    if (this.formNew.valid) {
      this.apiService.crearEducacion(this.formNew.value).subscribe({
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
    } else {
      this.toastr.error('Error en la validación del formulario. Revisar campos.', '', { progressBar: false });
    }
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModalEdit(EducacionModalEdit: TemplateRef<any>, id: any) {
    this.apiService.obtenerEducacionID(id).subscribe({
      next: edu => {
        this.educacion = edu;
        this.formEdit.patchValue({
          id: this.educacion.id,
          titulo: this.educacion.titulo,
          inicio: this.educacion.inicio,
          fin: this.educacion.fin,
          ubicacion: this.educacion.ubicacion,
          descripcion: this.educacion.descripcion,
          imagen: this.educacion.imagen,
          usuarios_idusuario: this.educacion.usuarios_idusuario
        })
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(EducacionModalEdit);
  }

  openModalNew(EducacionModalNew: TemplateRef<any>) {
    this.formNew.patchValue({
      titulo: "",
      inicio: "",
      fin: "",
      ubicacion: "",
      descripcion: "",
      imagen: "",
      usuarios_idusuario: "1"
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(EducacionModalNew);
  }


  mostrarDialogo(id: any): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Está seguro de que desea eliminar el registro?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.apiService.eliminarEducacion(id).subscribe({
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
