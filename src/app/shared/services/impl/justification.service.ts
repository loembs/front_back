import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Justification } from '../../models/justification.model';
import { JustificationDashboardDto } from '../../models/dto/Request/justificationDashboardDto';
import { JustificationFilterDto } from '../../models/dto/Request/justicationFilterDto';
import { ValidateJustificationDto } from '../../models/dto/Request/validateJustificationDto';
import { ActionResponseDto } from '../../models/dto/Response/actionResponseDto';
import { IJustification } from '../IJustification.service';

@Injectable({
  providedIn: 'root'
})
export class JustificationService implements IJustification {
  private baseUrl = 'http://localhost:8080/api/justifications';

  constructor(private httpClient: HttpClient) { }

  getJustifications(filter?: JustificationFilterDto): Observable<JustificationDashboardDto[]> {
    let params = new HttpParams();
    
    if (filter) {
      if (filter.date) params = params.set('date', filter.date.toISOString());
      if (filter.status) params = params.set('status', filter.status);
    }

    return this.httpClient.get<JustificationDashboardDto[]>(`${this.baseUrl}/dashboard`, { params });
  }
  
  validateJustification(data: ValidateJustificationDto): Observable<ActionResponseDto> {
    return this.httpClient.post<ActionResponseDto>(`${this.baseUrl}/validate`, data);
  }

  rejectJustification(data: ValidateJustificationDto): Observable<ActionResponseDto> {
    return this.httpClient.post<ActionResponseDto>(`${this.baseUrl}/reject`, data);
  }

  getJustificationsByStudent(studentId: number): Observable<JustificationDashboardDto[]> {
    return this.httpClient.get<JustificationDashboardDto[]>(`${this.baseUrl}/student/${studentId}`);
  }
}