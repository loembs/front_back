import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Justification, JustificationStatus } from '../../../../../shared/store/app.store';

@Component({
  selector: 'ism-justification',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './justification.component.html',
  styleUrl: './justification.component.css'
})
export class JustificationComponent {
    @Input() justificationData: Justification = {
      image: '',
      nomEtudiant: 'Jean Dupont',
      matricule: '20231234',
      nomClasse: 'L3 Info',
      date: '2025-05-30',
      nomModule: 'Mathématiques',
      enumJustification: 'Valider',
      motif: 'Cause Voyage',
      id: '',
      pieceJointe: []
    };

  constructor(private router: Router) {}

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  getStatusText(status: JustificationStatus): string {
    switch (status) {
      case 'Valider': return 'Validée';
      case 'Rejeter': return 'Refusée';
      case 'EnCours': return 'En cours';
      default: return 'Inconnu';
    }
  }

  viewJustification(justification: Justification): void {
    console.log('Navigation avec justification:', justification);
    this.router.navigate(['/dashboard/validation'], {
      state: { justification }
    });
  }

  getImageArray(): string[] {
    if (Array.isArray(this.justificationData.image)) {
      return this.justificationData.image;
    }
    return [];
  }
}