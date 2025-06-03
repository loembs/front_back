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
      images: '',
      nomEtudiant: 'Jean Dupont',
      matricule: '20231234',
      nomClasse: 'L3 Info',
      date: '2025-05-30',
      nomModule: 'Mathématiques',
      enumJustifiaction: 'VALIDEE',
      motif: 'Cause Voyage',
      id: 1
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
      case 'VALIDEE': return 'Validée';
      case 'REFUSEE': return 'Refusée';
      case 'EN_ATTENTE': return 'Non validée';
      default: return 'Inconnu';
    }
  }

  viewJustification(id: number): void {
    console.log('Voir justification avec ID:', id);
    this.router.navigate(['/dashboard/validation', id], {
      state: { justification: this.justificationData }
    });
  }

}
