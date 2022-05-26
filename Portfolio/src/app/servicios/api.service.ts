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

  public actualizarInformacionPersonal(body: any): Observable<any>{
    return this.http.put<any>(this.apiURL + `informacionpersonal`, body);
  }

  //Conocimientos

  public obtenerConocimientos(): Observable<conocimientos[]> {
    return this.http.get<conocimientos[]>(this.apiURL + 'conocimientos');
  }

  public obtenerConocimientosID(id: number): Observable<conocimientos> {
    return this.http.get<conocimientos>(this.apiURL + 'conocimiento/' + id);
  }

  //Experiencias

  public obtenerExperiencias(): Observable<experiencias[]> {
    return this.http.get<experiencias[]>(this.apiURL + 'experiencias');
  }

  public obtenerExperienciaID(id: number): Observable<experiencias> {
    return this.http.get<experiencias>(this.apiURL + 'experiencia/' + id);
  }

  public actualizarExperiencia(body: any){
    return this.http.put<any>(this.apiURL + `experiencia`, body);
  }

  public eliminarExperiencia(id: number){
    return this.http.delete<any>(this.apiURL + `experiencia/` + id);
  }

  public crearExperiencia(body: any){
    return this.http.post<any>(this.apiURL + `experiencia`, body);
  }

  //Educacion

  public obtenerEducacion(): Observable<educacion[]> {
    return this.http.get<educacion[]>(this.apiURL + 'educacion');
  }

  public obtenerEducacionID(id: number): Observable<educacion> {
    return this.http.get<educacion>(this.apiURL + 'educacion/' + id);
  }

  //Proyectos

  public obtenerProyectos(): Observable<proyectos[]> {
    return this.http.get<proyectos[]>(this.apiURL + 'proyectos');
  }

  public obtenerProyectoID(id: number): Observable<proyectos> {
    return this.http.get<proyectos>(this.apiURL + 'proyecto/' + id);
  }

  //Idiomas

  public obtenerIdiomas(): Observable<idiomas[]> {
    return this.http.get<idiomas[]>(this.apiURL + 'idiomas');
  }

  public obtenerIdiomaID(id: number): Observable<idiomas> {
    return this.http.get<idiomas>(this.apiURL + 'idioma/' + id);
  }

}
