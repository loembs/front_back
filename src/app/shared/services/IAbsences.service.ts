import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbsenceDashboardDto } from '../models/dto/absenceDashboardDto';
import { FAKE_ABSENCES } from '../mock/fake-absences.data';
import { AbsenceFilterDto } from '../models/dto/absenceFilterDto';


export interface IAbsencesService {

  getAllAbsences(): Observable<AbsenceDashboardDto[]>; 

  getAbsenceById(id: number): Observable<AbsenceDashboardDto | undefined>; 

  validateJustification(id: number): Observable<AbsenceDashboardDto | null>; 

  rejectJustification(id: number): Observable<AbsenceDashboardDto | null>; 

  filterAbsences(filter: AbsenceFilterDto): AbsenceDashboardDto[]; 

  sameDate(date1: any, date2: any): boolean 
}