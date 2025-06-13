import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AbsenceDashboardDto } from '../../models/dto/Request/absenceDashboardDto';
import { AbsenceFilterDto } from '../../models/dto/Request/absenceFilterDto';
import { IAbsencesService } from '../IAbsences.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService implements IAbsencesService {
  private baseUrl = 'https://backgroupe6-3onn.onrender.com/api/absence/listes'; 

  constructor(private httpClient: HttpClient) { }

  getAllAbsences(): Observable<AbsenceDashboardDto[]> {
    return this.httpClient.get<AbsenceDashboardDto[]>(`${this.baseUrl}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des absences', error);
          return throwError(() => error);
        })
      );
  }

  getAbsenceById(id: number): Observable<AbsenceDashboardDto | undefined> {
    return this.httpClient.get<AbsenceDashboardDto>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement de l’absence', error);
          return throwError(() => error);
        })
      );
  }

  filterAbsences(filter: AbsenceFilterDto): Observable<AbsenceDashboardDto[]> {
    let params = new HttpParams();
    if (filter.etatAbsence) params = params.set('etatAbsence', filter.etatAbsence);
    if (filter.date) params = params.set('date', filter.date.toISOString().split('T')[0]);

    return this.httpClient.get<AbsenceDashboardDto[]>(this.baseUrl, { params }).pipe(
      catchError(error => {
        console.error('Erreur filtrage', error);
        return throwError(() => error);
      })
    );
  }

  validateJustification(id: number): Observable<AbsenceDashboardDto> {
    return this.httpClient.patch<AbsenceDashboardDto>(`${this.baseUrl}/${id}`, { etatAbsence: 'justifie' });
  }

  rejectJustification(id: number): Observable<AbsenceDashboardDto> {
    return this.httpClient.patch<AbsenceDashboardDto>(`${this.baseUrl}/${id}`, { etatAbsence: 'non_justifie' });
  }
}

