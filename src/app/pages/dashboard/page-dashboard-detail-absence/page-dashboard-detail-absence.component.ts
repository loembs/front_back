import { Component, OnInit } from '@angular/core';
import { Utilisateur } from '../../../shared/models/utilisateur.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AbsenceDashboardDto } from '../../../shared/models/dto/Request/absenceDashboardDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ism-page-dashboard-detail-absence',
  imports: [CommonModule],
  templateUrl: './page-dashboard-detail-absence.component.html',
  styleUrl: './page-dashboard-detail-absence.component.css'
})
export class PageDashboardDetailAbsenceComponent implements OnInit {
  absenceId: number | null = null;
  absence: AbsenceDashboardDto | null = null;
  absences: AbsenceDashboardDto[] = [];
  allAbsences: AbsenceDashboardDto[] = [];
  userInfo: Utilisateur | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const state = history.state as { absence?: AbsenceDashboardDto };

    if (state?.absence) {
      this.absence = state.absence;
      console.log('Absence transmise par state :', this.absence);
    } else {
      console.error('Aucune absence transmise, retour à la liste');
      this.router.navigate(['/dashboard/absence']);
    }
  }

   goToAbsences(): void {
  this.router.navigate(['/dashboard/absences']);
}
}
