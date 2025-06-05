import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { JustificationDashboardDto } from '../../models/dto/Request/justificationDashboardDto';
import { JustificationFilterDto } from '../../models/dto/Request/justicationFilterDto';
import { ValidateJustificationDto } from '../../models/dto/Request/validateJustificationDto';
import { ActionResponseDto } from '../../models/dto/Response/actionResponseDto';
import { IJustification } from '../IJustification.service';

@Injectable({
  providedIn: 'root'
})
export class JustificationService implements IJustification {
  private baseUrl = 'https://backgroupe6.onrender.com/api/justification';

  constructor(private httpClient: HttpClient) {}

  

  

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

  validateJustification(justificationId: string, data: { enumJustification: string }): Observable<ActionResponseDto> {
    return this.httpClient.put<ActionResponseDto>(`${this.baseUrl}/validation/${justificationId}`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur HTTP lors de la validation:', error);
          let errorMessage = 'Une erreur inconnue est survenue lors de la validation.';
          
          if (!(error.error instanceof ErrorEvent)) {
             try {
                if (typeof error.error === 'string') {
                  errorMessage = `Erreur du backend: ${error.error}`;
                } else if (error.error && typeof error.error === 'object') {
                  errorMessage = `Erreur du backend (${error.status}): ${JSON.stringify(error.error)}`;
                } else {
                  errorMessage = `Erreur du backend: ${error.status} ${error.statusText}`;
                }
             } catch (e) {
                errorMessage = `Erreur du backend: ${error.status} ${error.statusText} (impossible de lire le corps)`;
             }
          } else {
             errorMessage = `Erreur réseau/client: ${error.error.message}`;
          }

          console.error(errorMessage);
          return throwError(() => new Error(errorMessage)); 
        })
      );
  }

  rejectJustification(justificationId: string, data: { enumJustification: string }): Observable<ActionResponseDto> {
    return this.httpClient.put<ActionResponseDto>(`${this.baseUrl}/validation/${justificationId}`, data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
           console.error('Erreur HTTP lors du rejet:', error);
          let errorMessage = 'Une erreur inconnue est survenue lors du rejet.';
           if (!(error.error instanceof ErrorEvent)) {
             try {
                if (typeof error.error === 'string') {
                  errorMessage = `Erreur du backend: ${error.error}`;
                } else if (error.error && typeof error.error === 'object') {
                  errorMessage = `Erreur du backend (${error.status}): ${JSON.stringify(error.error)}`;
                } else {
                  errorMessage = `Erreur du backend: ${error.status} ${error.statusText}`;
                }
             } catch (e) {
                errorMessage = `Erreur du backend: ${error.status} ${error.statusText} (impossible de lire le corps)`;
             }
          } else {
             errorMessage = `Erreur réseau/client: ${error.error.message}`;
          }
           console.error(errorMessage);
          return throwError(() => new Error(errorMessage)); 
        })
      );
  }

  getJustificationsByStudent(studentId: number): Observable<JustificationDashboardDto[]> {
    return this.httpClient.get<JustificationDashboardDto[]>(`${this.baseUrl}/student/${studentId}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération des justifications de l\'étudiant:', error);
          return throwError(() => error);
        })
      );
  }

  getJustificationById(id: number): Observable<JustificationDashboardDto> {
    return this.httpClient.get<JustificationDashboardDto>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la récupération de la justification par ID:', error);
          return throwError(() => error);
        })
      );
  }
}
