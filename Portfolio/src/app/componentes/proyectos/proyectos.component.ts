import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { proyectos } from 'src/app/models/proyectos';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  load: boolean = false;
  load2: boolean = false;
  modalRef!: BsModalRef;
  proyectosList!: Observable<proyectos[]>;
  proyecto!: proyectos;
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
    this.cargarProyectos();
    this.load = true;
  }

  cargarProyectos() {
    this.proyectosList = this.apiService.obtenerProyectos().pipe(
      tap(proyectos => {
        proyectos.sort((a, b) =>
          new Date(b.inicio).getTime() - new Date(a.inicio).getTime()
        );
      })
    );
  }

  actualizarProyecto(event: Event) {
    event.preventDefault;
    if (this.formEdit.valid) {
      this.apiService.actualizarProyecto(this.formEdit.value).subscribe({
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

  crearProyecto(event: Event) {
    event.preventDefault;
    if (this.formNew.valid) {
      this.apiService.crearProyecto(this.formNew.value).subscribe({
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

  openModal(ProyectoModalEdit: TemplateRef<any>, id: any) {
    this.apiService.obtenerProyectoID(id).subscribe({
      next: pro => {
        this.proyecto = pro;
        this.formEdit.patchValue({
          id: this.proyecto.id,
          titulo: this.proyecto.titulo,
          inicio: this.proyecto.inicio,
          fin: this.proyecto.fin,
          ubicacion: this.proyecto.ubicacion,
          descripcion: this.proyecto.descripcion,
          imagen: this.proyecto.imagen,
          usuarios_idusuario: this.proyecto.usuarios_idusuario
        })
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(ProyectoModalEdit);
  }

  openModalNew(ProyectoModalNew: TemplateRef<any>) {
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
    this.modalRef = this.modalService.show(ProyectoModalNew);
  }

  mostrarDialogo(id: any): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Está seguro de que desea eliminar el registro?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.apiService.eliminarProyecto(id).subscribe({
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
