import { Component, OnInit } from '@angular/core';
import { IAbsencesService } from '../../../shared/services/IAbsences.service';
import { AbsenceDashboardDto } from '../../../shared/models/dto/absenceDashboardDto';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'ism-page-dashboard-absence',
  imports: [CommonModule],
  templateUrl: './page-dashboard-absence.component.html',
  styleUrl: './page-dashboard-absence.component.css',
})
export class PageDashboardAbsenceComponent implements OnInit {
  absences: AbsenceDashboardDto[] = [];

  constructor(private absenceService: IAbsencesService) {}


  ngOnInit(): void {
    this.getAbsences();
  }

    onVoir(id: number): void {
  console.log('Voir justification pour l\'absence ID :', id);
}

  getAbsences(): void {
    this.absenceService.getAllAbsences().subscribe((data: AbsenceDashboardDto[]) => {
      this.absences = data;
    });
  }

  onValidate(id: number): void {
    console.log('Validation de l’absence ID :', id);
  }

  onReject(id: number): void {
    console.log('Rejet de la justification pour l’absence ID :', id);
  }
}
