import { Component, OnInit } from '@angular/core';
import { IAbsencesService } from '../../../shared/services/IAbsences.service';
import { AbsenceDashboardDto } from '../../../shared/models/dto/absenceDashboardDto';
import { AbsenceFilterDto } from '../../../shared/models/dto/absenceFilterDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { InfoUserCardComponent } from "../components/info-user-card/info-user-card.component";


@Component({
  selector: 'ism-page-dashboard-absence',
  standalone: true,
  imports: [CommonModule, FormsModule, InfoUserCardComponent],
  templateUrl: './page-dashboard-absence.component.html',
  styleUrl: './page-dashboard-absence.component.css',
})
export class PageDashboardAbsenceComponent implements OnInit {
  absences: AbsenceDashboardDto[] = [];
  allAbsences: AbsenceDashboardDto[] = [];

  absenceFilter: AbsenceFilterDto = {
    batiment: null as any,
    date: null as any,
    status: null as any
  };

  constructor(private absenceService: IAbsencesService, private router: Router) {}

  ngOnInit(): void {
    this.getAbsences();
  }

  getAbsences(): void {
    this.absenceService.getAllAbsences().subscribe((data: AbsenceDashboardDto[]) => {
      this.allAbsences = data;
      this.absences = data;
    });
  }

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

  onVoir(id: number): void {
    console.log('Voir justification pour l\'absence ID :', id);
  }

  onValidate(id: number): void {
    console.log('Validation de l’absence ID :', id);
  }

  onReject(id: number): void {
    console.log('Rejet de la justification pour l’absence ID :', id);
  }

  
goToValidation(justificationId: number): void {
  this.router.navigate(['/dashboard/validation', justificationId]);
}

}
