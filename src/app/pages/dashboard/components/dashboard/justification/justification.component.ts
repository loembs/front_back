import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    @Input() justificationData = {
    photo: '', 
    nom: 'Jean Dupont',
    matricule: '20231234',
    classe: 'L3 Info',
    date: '2025-05-30',
    cours: 'Mathématiques',
    status: 'VALIDEE',
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

  getStatusText(status: string): string {
    switch (status) {
      case 'VALIDEE': return 'Validée';
      case 'EN_ATTENTE': return 'En attente';
      case 'REFUSEE': return 'Refusée';
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
