import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Justification } from '../../models/justification.model';
import { JustificationDashboardDto } from '../../models/dto/Request/justificationDashboardDto';
import { JustificationFilterDto } from '../../models/dto/Request/justicationFilterDto';
import { ValidateJustificationDto } from '../../models/dto/Request/validateJustificationDto';
import { ActionResponseDto } from '../../models/dto/Response/actionResponseDto';
import { IJustification } from '../IJustification.service';

// Interface pour la structure du db.json distant
interface DbJsonStructure {
  connexionEtudiantResponse: any[];
  connexionResponse: any[];
  absences: any[];
  justificationPost: any[];
  absencesListWebDto: any[];
  justificationsListWebDto: JustificationDashboardDto[];
}

@Injectable({
  providedIn: 'root'
})
export class JustificationService2 implements IJustification {
  // URL vers le dossier distant db_ism
  private baseUrl = 'http://localhost:3000/api/justifications';
  private dbUrl = 'http://localhost:8080/db.json'; // Remplacez par l'URL réelle

  constructor(private httpClient: HttpClient) { }

  /**
   * Récupère les justifications depuis le fichier db.json distant
   */
  getJustificationsFromDb(): Observable<JustificationDashboardDto[]> {
    return this.httpClient.get<DbJsonStructure>(this.dbUrl)
      .pipe(
        map(data => data.justificationsListWebDto || []),
        catchError(error => {
          console.error('Error fetching justifications from db.json:', error);
          return throwError(() => error);
        })
      );
  }

  getJustifications(filter?: JustificationFilterDto): Observable<JustificationDashboardDto[]> {
    // Option 1: Utiliser les données du fichier db.json distant
    if (this.shouldUseRemoteDb()) {
      return this.getJustificationsFromDb().pipe(
        map(justifications => this.applyFilters(justifications, filter))
      );
    }

    // Option 2: Utiliser l'API locale (code original)
    let params = new HttpParams();
        
    if (filter) {
      if (filter.date) params = params.set('date', filter.date.toISOString());
      if (filter.status) params = params.set('status', filter.status);
    }

    return this.httpClient.get<JustificationDashboardDto[]>(`${this.baseUrl}/dashboard`, { params })
      .pipe(
        catchError(error => {
          console.error('Error fetching justifications:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Applique les filtres sur les données récupérées
   */
  private applyFilters(justifications: JustificationDashboardDto[], filter?: JustificationFilterDto): JustificationDashboardDto[] {
    if (!filter) return justifications;

    return justifications.filter(justification => {
      let matches = true;

      if (filter.date) {
        const justificationDate = new Date(justification.date);
        const filterDate = new Date(filter.date);
        matches = matches && justificationDate.toDateString() === filterDate.toDateString();
      }

      if (filter.status) {
        matches = matches && justification.enumJustification === filter.status;
      }

      return matches;
    });
  }

  /**
   * Détermine si on doit utiliser la base de données distante ou l'API locale
   */
  private shouldUseRemoteDb(): boolean {
    // Vous pouvez configurer cette logique selon vos besoins
    // Par exemple, utiliser une variable d'environnement
    return true; // Pour utiliser le db.json distant par défaut
  }

  validateJustification(data: ValidateJustificationDto): Observable<ActionResponseDto> {
    return this.httpClient.post<ActionResponseDto>(`${this.baseUrl}/validate`, data)
      .pipe(
        catchError(error => {
          console.error('Error validating justification:', error);
          return throwError(() => error);
        })
      );
  }

  rejectJustification(data: ValidateJustificationDto): Observable<ActionResponseDto> {
    return this.httpClient.post<ActionResponseDto>(`${this.baseUrl}/reject`, data)
      .pipe(
        catchError(error => {
          console.error('Error rejecting justification:', error);
          return throwError(() => error);
        })
      );
  }

  getJustificationsByStudent(studentId: number): Observable<JustificationDashboardDto[]> {
    if (this.shouldUseRemoteDb()) {
      return this.getJustificationsFromDb().pipe(
        map(justifications => justifications.filter(j => j.matricule === studentId.toString()))
      );
    }

    return this.httpClient.get<JustificationDashboardDto[]>(`${this.baseUrl}/student/${studentId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching student justifications:', error);
          return throwError(() => error);
        })
      );
  }

  getJustificationById(id: number): Observable<JustificationDashboardDto> {
    if (this.shouldUseRemoteDb()) {
      return this.getJustificationsFromDb().pipe(
        map(justifications => {
          const justification = justifications.find(j => Number(j.id) === id);
          if (!justification) {
            throw new Error(`Justification with id ${id} not found`);
          }
          return justification;
        })
      );
    }

    return this.httpClient.get<JustificationDashboardDto>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching justification by ID:', error);
          return throwError(() => error);
        })
      );
  }
}