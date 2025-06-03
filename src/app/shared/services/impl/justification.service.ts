import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  validateJustification(data: ValidateJustificationDto): Observable<ActionResponseDto> {
    return this.httpClient.post<ActionResponseDto>(`${this.baseUrl}/validate`, data)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la validation:', error);
          return throwError(() => error);
        })
      );
  }

  rejectJustification(data: ValidateJustificationDto): Observable<ActionResponseDto> {
    return this.httpClient.post<ActionResponseDto>(`${this.baseUrl}/reject`, data)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du rejet:', error);
          return throwError(() => error);
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
