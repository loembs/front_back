import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbsenceDashboardDto } from '../../models/dto/Request/absenceDashboardDto';
import { AbsenceFilterDto } from '../../models/dto/Request/absenceFilterDto';

import { IAbsences } from '../IAbsences.service';
@Injectable({
  providedIn: 'root'
})
export class AbsencesService implements IAbsences {
  private baseUrl = 'http://localhost:8080/api/absences';

  constructor(private httpClient: HttpClient) { }

  getAbsences(filter?: AbsenceFilterDto): Observable<AbsenceDashboardDto[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.date) params = params.set('date', filter.date.toISOString());
      if (filter.batiment) params = params.set('batiment', filter.batiment);
      if (filter.classe) params = params.set('classe', filter.classe);
    }

    return this.httpClient.get<AbsenceDashboardDto[]>(`${this.baseUrl}/dashboard`, { params });
  }

  getAbsencesByStudent(studentId: number): Observable<AbsenceDashboardDto[]> {
    return this.httpClient.get<AbsenceDashboardDto[]>(`${this.baseUrl}/student/${studentId}`);
  }

  getAbsencesByCourse(courseId: number): Observable<AbsenceDashboardDto[]> {
    return this.httpClient.get<AbsenceDashboardDto[]>(`${this.baseUrl}/course/${courseId}`);
  }
}