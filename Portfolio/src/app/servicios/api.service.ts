import { Injectable } from '@angular/core';
import { acercade } from '../models/acercade';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { conocimientos } from '../models/conocimientos';
import { experiencias } from '../models/experiencias';
import { educacion } from '../models/educacion';
import { proyectos } from '../models/proyectos';
import { idiomas } from '../models/idiomas';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = 'https://heroku-miportfolio-dsalcedo.herokuapp.com/api/';
  //apiURL = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  //Informacion Personal

  public obtenerInformacionPersonal(): Observable<acercade[]> {
    return this.http.get<acercade[]>(this.apiURL + 'informacionpersonal');
  }

  public actualizarInformacionPersonal(body: any): Observable<any> {
    return this.http.put<any>(this.apiURL + `informacionpersonal`, body);
  }

  //Conocimientos

  public obtenerConocimientos(): Observable<conocimientos[]> {
    return this.http.get<conocimientos[]>(this.apiURL + 'conocimientos');
  }

  public obtenerConocimientoID(id: number): Observable<conocimientos> {
    return this.http.get<conocimientos>(this.apiURL + 'conocimiento/' + id);
  }

  public actualizarConocimiento(body: any) {
    return this.http.put<any>(this.apiURL + `conocimiento`, body);
  }

  public eliminarConocimiento(id: number) {
    return this.http.delete<any>(this.apiURL + `conocimiento/` + id);
  }

  public crearConocimiento(body: any) {
    return this.http.post<any>(this.apiURL + `conocimiento`, body);
  }

  //Experiencias

  public obtenerExperiencias(): Observable<experiencias[]> {
    return this.http.get<experiencias[]>(this.apiURL + 'experiencias');
  }

  public obtenerExperienciaID(id: number): Observable<experiencias> {
    return this.http.get<experiencias>(this.apiURL + 'experiencia/' + id);
  }

  public actualizarExperiencia(body: any) {
    return this.http.put<any>(this.apiURL + `experiencia`, body);
  }

  public eliminarExperiencia(id: number) {
    return this.http.delete<any>(this.apiURL + `experiencia/` + id);
  }

  public crearExperiencia(body: any) {
    return this.http.post<any>(this.apiURL + `experiencia`, body);
  }

  //Educacion

  public obtenerEducacion(): Observable<educacion[]> {
    return this.http.get<educacion[]>(this.apiURL + 'educacion');
  }

  public obtenerEducacionID(id: number): Observable<educacion> {
    return this.http.get<educacion>(this.apiURL + 'educacion/' + id);
  }

  public actualizarEducacion(body: any) {
    return this.http.put<any>(this.apiURL + `educacion`, body);
  }

  public eliminarEducacion(id: number) {
    return this.http.delete<any>(this.apiURL + `educacion/` + id);
  }

  public crearEducacion(body: any) {
    return this.http.post<any>(this.apiURL + `educacion`, body);
  }

  //Proyectos

  public obtenerProyectos(): Observable<proyectos[]> {
    return this.http.get<proyectos[]>(this.apiURL + 'proyectos');
  }

  public obtenerProyectoID(id: number): Observable<proyectos> {
    return this.http.get<proyectos>(this.apiURL + 'proyecto/' + id);
  }

  public actualizarProyecto(body: any) {
    return this.http.put<any>(this.apiURL + `proyecto`, body);
  }

  public eliminarProyecto(id: number) {
    return this.http.delete<any>(this.apiURL + `proyecto/` + id);
  }

  public crearProyecto(body: any) {
    return this.http.post<any>(this.apiURL + `proyecto`, body);
  }

  //Idiomas

  public obtenerIdiomas(): Observable<idiomas[]> {
    return this.http.get<idiomas[]>(this.apiURL + 'idiomas');
  }

  public obtenerIdiomaID(id: number): Observable<idiomas> {
    return this.http.get<idiomas>(this.apiURL + 'idioma/' + id);
  }

  public actualizarIdioma(body: any) {
    return this.http.put<any>(this.apiURL + `idioma`, body);
  }

  public eliminarIdioma(id: number) {
    return this.http.delete<any>(this.apiURL + `idioma/` + id);
  }

  public crearIdioma(body: any) {
    return this.http.post<any>(this.apiURL + `idioma`, body);
  }

}
