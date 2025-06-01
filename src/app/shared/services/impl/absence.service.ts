import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbsenceDashboardDto } from '../../models/dto/absenceDashboardDto';
import { FAKE_ABSENCES } from '../../mock/fake-absences.data';
import { AbsenceFilterDto } from '../../models/dto/absenceFilterDto';
import { IAbsencesService } from '../IAbsences.service';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService implements IAbsencesService {
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

  filterAbsences(filter: AbsenceFilterDto): AbsenceDashboardDto[] {
    return this.absences.filter(abs =>
      abs.batiment === filter.batiment &&
      this.sameDate(abs.date, filter.date) &&
      abs.status.toLowerCase() === filter.status.toLowerCase()
    );
  }

  sameDate(date1: any, date2: any): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}
}