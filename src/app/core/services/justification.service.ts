import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JustificationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Récupérer la liste des justifications
  getJustificationsList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/justificationsListWebDto`);
  }

  // Récupérer les absences
  getAbsences(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/absences`);
  }

  // Poster une nouvelle justification
  postJustification(justification: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/justificationPost`, justification);
  }

  // Récupérer les absences avec détails
  getAbsencesList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/absencesListWebDto`);
  }
} 