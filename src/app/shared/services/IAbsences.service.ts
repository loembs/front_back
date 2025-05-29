import { Observable } from 'rxjs';
import { Pointage } from '../models/pointage.model';

export interface IAbsences {
  getAbsences(): Observable<Pointage[]>;
  getAbsencesByStudent(studentId: number): Observable<Pointage[]>;
  getAbsencesByCourse(courseId: number): Observable<Pointage[]>;
} 