import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { AcercadeComponent } from './componentes/acercade/acercade.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { ConocimientosIdiomaComponent } from './componentes/conocimientos-idioma/conocimientos-idioma.component';
import { ConocimientosHabilidadesComponent } from './componentes/conocimientos-habilidades/conocimientos-habilidades.component';
import { PortfolioService } from './servicios/portfolio.service';
import { InterceptorService } from './servicios/interceptor.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogoConfirmacionComponent } from './componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatSliderModule } from '@angular/material/slider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AcercadeComponent,
    ExperienciaComponent,
    EducacionComponent,
    ProyectosComponent,
    LoginComponent,
    HomeComponent,
    ConocimientosIdiomaComponent,
    ConocimientosHabilidadesComponent,
    DialogoConfirmacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3000, progressBar: true, progressAnimation: 'increasing', preventDuplicates: true }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatSliderModule,
    ProgressSpinnerModule,
    MatTooltipModule
  ],
  providers: [PortfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  entryComponents: [
    DialogoConfirmacionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
