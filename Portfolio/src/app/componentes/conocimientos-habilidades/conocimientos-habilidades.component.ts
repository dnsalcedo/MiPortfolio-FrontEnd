import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { conocimientos } from 'src/app/models/conocimientos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
  conocimientosList: conocimientos[] = [];
  conocimiento!: conocimientos;
  formEdit!: FormGroup;
  formNew!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private tokenService: TokenService, private modalService: BsModalService, private apiService: ApiService, private toastr: ToastrService, public dialogo: MatDialog) {
    this.formEdit = this.formBuilder.group({
      id: [''],
      texto: ['', [Validators.required]],
      usuarios_idusuario: [''],
    })
    this.formNew = this.formBuilder.group({
      texto: ['', [Validators.required]],
      usuarios_idusuario: [''],
    })
  }

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

  actualizarConocimiento(event: Event) {
    event.preventDefault;
    this.apiService.actualizarConocimiento(this.formEdit.value).subscribe({
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
    this.apiService.crearConocimiento(this.formNew.value).subscribe({
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.array, event.previousIndex, event.currentIndex);
  }

  isLogged() {
    return this.tokenService.isLogged();
  }

  openModalEdit(ConocimientoModalEdit: TemplateRef<any>, id: any) {
    this.apiService.obtenerConocimientoID(id).subscribe({
      next: con => {
        this.conocimiento = con;
        this.formEdit.patchValue({
          id: this.conocimiento.id,
          texto: this.conocimiento.texto,
          usuarios_idusuario: this.conocimiento.usuarios_idusuario
        })
      }
    })
    this.load2 = true;
    this.modalRef = this.modalService.show(ConocimientoModalEdit);
  }

  openModalNew(ConocimientoModalNew: TemplateRef<any>) {
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
    this.modalRef = this.modalService.show(ConocimientoModalNew);
  }


  mostrarDialogo(id: any): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `¿Está seguro de que desea eliminar el registro?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.apiService.eliminarConocimiento(id).subscribe({
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
