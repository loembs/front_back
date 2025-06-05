import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbsenceDashboardDto } from '../models/dto/Request/absenceDashboardDto';
import { AbsenceFilterDto } from '../models/dto/Request/absenceFilterDto';


export interface IAbsencesService {

  getAllAbsences(): Observable<AbsenceDashboardDto[]>; 

  getAbsenceById(id: number): Observable<AbsenceDashboardDto | undefined>; 

  validateJustification(id: number): Observable<AbsenceDashboardDto | null>; 

  rejectJustification(id: number): Observable<AbsenceDashboardDto | null>; 

  filterAbsences(filter: AbsenceFilterDto): Observable<AbsenceDashboardDto[]>;
 
}