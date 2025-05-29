import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbsenceDashboardDto} from '../models/dto/absenceDashboardDto';
import { FAKE_ABSENCES } from '../mock/fake-absences.data';

@Injectable({
  providedIn: 'root'
})
export class IAbsencesService {
  private absences: AbsenceDashboardDto[] = FAKE_ABSENCES;

  constructor() {}

  
  getAllAbsences(): Observable<AbsenceDashboardDto[]> {
    return of(this.absences);
  }

  
  getAbsenceById(id: number): Observable<AbsenceDashboardDto | undefined> {
    const found = this.absences.find(a => a.id === id);
    return of(found);
  }

  
  validateJustification(id: number): Observable<AbsenceDashboardDto | null> {
  const index = this.absences.findIndex(a => a.id === id);
  if (index !== -1) {
    this.absences[index].status = 'Justifie';
    return of(this.absences[index]);
  }
  return of(null);
}

  
  rejectJustification(id: number): Observable<AbsenceDashboardDto | null> {
  const index = this.absences.findIndex(a => a.id === id);
  if (index !== -1) {
    this.absences[index].status = 'Non-justifie';
    this.absences[index].justificationId = 0; 
    return of(this.absences[index]);
  }
  return of(null);
}
}