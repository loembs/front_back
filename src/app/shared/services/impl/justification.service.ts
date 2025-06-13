import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { JustificationDashboardDto } from '../../models/dto/Request/justificationDashboardDto';
import { JustificationFilterDto } from '../../models/dto/Request/justicationFilterDto';
import { ValidateJustificationDto } from '../../models/dto/Request/validateJustificationDto';
import { ActionResponseDto } from '../../models/dto/Response/actionResponseDto';
import { IJustification } from '../IJustification.service';
import { AuthentificationService } from './authentification-mock.service';

@Injectable({
  providedIn: 'root'
})
export class JustificationService implements IJustification {
  private baseUrl = 'https://backgroupe6.onrender.com/api/justification';

  constructor(
    private httpClient: HttpClient,
  ) {}

  getJustifications(filter?: JustificationFilterDto): Observable<JustificationDashboardDto[]> {
    let params = new HttpParams();

    if (filter) {
      if (filter.date) params = params.set('date', filter.date.toISOString());
      if (filter.status) params = params.set('status', filter.status);
    }

    return this.httpClient.get<JustificationDashboardDto[]>(`${this.baseUrl}/listes`, { params })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des justifications:', error);
          return throwError(() => error);
        })
      );
  }

  validateJustification(justificationId: string, data: ValidateJustificationDto): Observable<ActionResponseDto> {
    const url = `${this.baseUrl}/validation/${justificationId}`;
    const requestBody = {
      justificationId: justificationId,
      enumJustification: 'Valider'
    };
    
    console.log('=== Validation Request ===');
    console.log('URL:', url);
    console.log('Body:', requestBody);
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.httpClient.put(url, requestBody, { 
      headers,
      responseType: 'text'
    }).pipe(
      map(response => {
        console.log('Réponse brute du backend:', response);
        if (response.includes('succès') || response.includes('validée')) {
          return {
            success: true,
            message: response
          } as ActionResponseDto;
        }
        try {
          return JSON.parse(response);
        } catch (e) {
          console.error('Erreur parsing JSON:', e);
          console.log('Contenu reçu:', response);
          return {
            success: false,
            message: response
          } as ActionResponseDto;
        }
      }),
      catchError(error => {
        console.error('Erreur validation:', error);
        if (error.error) {
          console.error('Détails de l\'erreur:', error.error);
        }
        return throwError(() => error);
      })
    );
  }

  rejectJustification(justificationId: string, data: ValidateJustificationDto): Observable<ActionResponseDto> {
    const url = `${this.baseUrl}/validation/${justificationId}`;
    const requestBody = {
      justificationId: justificationId,
      enumJustification: 'Rejeter'
    };
    
    console.log('=== Reject Request ===');
    console.log('URL:', url);
    console.log('Body:', requestBody);
    
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.httpClient.put(url, requestBody, { 
      headers,
      responseType: 'text'
    }).pipe(
      map(response => {
        console.log('Réponse brute du backend:', response);
        if (response.includes('succès') || response.includes('rejetée')) {
          return {
            success: true,
            message: response
          } as ActionResponseDto;
        }
        try {
          return JSON.parse(response);
        } catch (e) {
          console.error('Erreur parsing JSON:', e);
          console.log('Contenu reçu:', response);
          return {
            success: false,
            message: response
          } as ActionResponseDto;
        }
      }),
      catchError(error => {
        console.error('Erreur rejet:', error);
        if (error.error) {
          console.error('Détails de l\'erreur:', error.error);
        }
        return throwError(() => error);
      })
    );
  }

  getJustificationsByStudent(studentId: number): Observable<JustificationDashboardDto[]> {
    return this.httpClient.get<JustificationDashboardDto[]>(`${this.baseUrl}/student/${studentId}`);
  }

  getJustificationById(id: number): Observable<JustificationDashboardDto> {
    return this.httpClient.get<JustificationDashboardDto>(`${this.baseUrl}/${id}`);
  }
}