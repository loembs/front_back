import { Component, effect, inject, OnInit } from '@angular/core';
import { AbsenceService } from '../../../shared/services/impl/absence.service';
import { AbsenceDashboardDto } from '../../../shared/models/dto/Request/absenceDashboardDto';
import { AbsenceFilterDto } from '../../../shared/models/dto/Request/absenceFilterDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { InfoUserCardComponent } from "../components/info-user-card/info-user-card.component";
import { response } from 'express';
import { AuthentificationService } from '../../../shared/services/impl/authentification-mock.service';
import { Utilisateur } from '../../../shared/models/utilisateur.model';


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
  private authService = inject(AuthentificationService);
  userInfo: Utilisateur | null = null;

  absenceFilter: AbsenceFilterDto = {
    batiment: null as any,
    date: null as any,
    etatAbsence: null as any
  };

  constructor(private absenceService: AbsenceService, private router: Router) {}

  
 ngOnInit(): void {
  this.absenceService.getAllAbsences().subscribe({
    next: (response: any) => {
      console.log('Réponse reçue :', response);
      this.absences = Array.isArray(response) ? response : response.content || [];
    },
    error: (err) => {
      console.error('Erreur :', err);
    }
  });
 
}
 getAbsences(): void {
  this.absenceService.getAllAbsences().subscribe((response: any) => {
    console.log('Réponse reçue :', response);
    const data = Array.isArray(response) ? response : response.content || [];
    this.allAbsences = data;
    this.absences=data;
  });
}

    applyFilter(): void {
  console.log('Filtrage en cours avec :', this.absenceFilter);
  this.absences = this.allAbsences.filter(abs =>
    (!this.absenceFilter.batiment || abs.batiment === this.absenceFilter.batiment) &&
    (!this.absenceFilter.etatAbsence || abs.etatAbsence === this.absenceFilter.etatAbsence) &&
    (!this.absenceFilter.date || this.sameDate(abs.date, this.absenceFilter.date))
  );
}

  resetFilter(): void {
    this.absenceFilter = {
      batiment: null as any,
      date: null as any,
      etatAbsence: null as any
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

getInitials(nom: string): string {
  if (!nom) return '';
  return nom.split(' ')
            .map(part => part.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
}

goToJustificatifs(): void {
  this.router.navigate(['/dashboard/justifications']);
}

/*userInfo = {
photo: "https://randomuser.me/api/portraits/men/75.jpg",
login: "patrick@gmail.com",
nom: "Kane Diaby",
password: "1234", 
role: "Admin",
description:"Responsable des programmes Batiment ingénieur "
};*/



}
