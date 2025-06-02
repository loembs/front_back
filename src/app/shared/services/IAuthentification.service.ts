import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';

export interface IAuthentification {
  login(username: string, password: string): Observable<Utilisateur>;
  logout(): Observable<void>;
  isLoggedIn(): Observable<boolean>;
} 