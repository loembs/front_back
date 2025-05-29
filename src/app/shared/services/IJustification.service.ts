import { Observable } from 'rxjs';
import { Justification } from '../models/justification.model';

export interface IJustification {
  getJustifications(): Observable<Justification[]>;
  validateJustification(id: number): Observable<void>;
  rejectJustification(id: number): Observable<void>;
} 