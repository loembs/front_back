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

  // Récupérer toutes les absences
  getAllAbsences(): Observable<AbsenceDashboardDto[]> {
    return of(this.absences);
  }

  // Récupérer une absence par ID
  getAbsenceById(id: number): Observable<AbsenceDashboardDto | undefined> {
    const found = this.absences.find(a => a.id === id);
    return of(found);
  }

  // Valider une justification
  validateJustification(id: number): Observable<AbsenceDashboardDto | null> {
    const index = this.absences.findIndex(a => a.id === id);
    if (index !== -1) {
      this.absences[index].isJustified = true;
      return of(this.absences[index]);
    }
    return of(null);
  }

  // Rejeter une justification
  rejectJustification(id: number): Observable<AbsenceDashboardDto| null> {
    const index = this.absences.findIndex(a => a.id === id);
    if (index !== -1) {
      this.absences[index].justificationId = 0;
      this.absences[index].isJustified = false;
      return of(this.absences[index]);
    }
    return of(null);
  }
}