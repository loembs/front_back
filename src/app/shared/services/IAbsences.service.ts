import { Observable } from 'rxjs';
import {AbsenceDashboardDto} from '../models/dto/Request/absenceDashboardDto';
import {AbsenceFilterDto} from '../models/dto/Request/absenceFilterDto';
export interface IAbsences {
  getAbsences(filter?: AbsenceFilterDto): Observable<AbsenceDashboardDto[]>;
  getAbsencesByStudent(studentId: number): Observable<AbsenceDashboardDto[]>;
  getAbsencesByCourse(courseId: number): Observable<AbsenceDashboardDto[]>;
} 