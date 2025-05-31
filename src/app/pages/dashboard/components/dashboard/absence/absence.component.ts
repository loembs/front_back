import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAbsencesService } from '../../../../../shared/services/IAbsences.service';
import { AbsenceFilterDto } from '../../../../../shared/models/dto/absenceFilterDto';
import { AbsenceDashboardDto } from '../../../../../shared/models/dto/absenceDashboardDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ism-absence',
  standalone: true,
    imports: [CommonModule, FormsModule],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.css'
})
export class AbsenceComponent {

  absences: AbsenceDashboardDto[] = [];
    allAbsences: AbsenceDashboardDto[] = [];
  
    absenceFilter: AbsenceFilterDto = {
      batiment: null as any,
      date: null as any,
      status: null as any
    };

constructor(private absenceService: IAbsencesService, private router: Router) {}


    applyFilter(): void {
  console.log('Filtrage en cours avec :', this.absenceFilter);
  this.absences = this.allAbsences.filter(abs =>
    (!this.absenceFilter.batiment || abs.batiment === this.absenceFilter.batiment) &&
    (!this.absenceFilter.status || abs.status === this.absenceFilter.status) &&
    (!this.absenceFilter.date || this.sameDate(abs.date, this.absenceFilter.date))
  );
}

  resetFilter(): void {
    this.absenceFilter = {
      batiment: null as any,
      date: null as any,
      status: null as any
    };
    this.absences = this.allAbsences;
  }

  sameDate(d1: Date, d2: Date): boolean {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return date1.toDateString() === date2.toDateString();
  }

  goToValidation(justificationId: number): void {
  this.router.navigate(['/dashboard/validation', justificationId]);
}
}
