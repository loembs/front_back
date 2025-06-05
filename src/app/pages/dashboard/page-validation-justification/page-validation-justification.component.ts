import { Component, inject, signal, OnInit } from '@angular/core';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { ValidateJustificationDto } from '../../../shared/models/dto/Request/validateJustificationDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Justification } from '../../../shared/models/justification.model'; // Assure-toi d'importer le bon modèle

@Component({
  selector: 'ism-page-validation-justification',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './page-validation-justification.component.html',
  styleUrl: './page-validation-justification.component.css'
})
export class PageValidationJustificationComponent implements OnInit {
  justification = signal<Justification | null>(null);
  justificationId = signal<number>(0);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  isArray = Array.isArray;

  private justificationService = inject(JustificationService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Récupérer la justification depuis le state de la route
    const state = history.state as { justification: Justification };
    console.log('État reçu:', state); // Pour le débogage
    
    if (state?.justification) {
      console.log('Justification trouvée:', state.justification); // Pour le débogage
      this.justification.set(state.justification);
      this.justificationId.set(state.justification.id);
    } else {
      console.log('Aucune justification trouvée dans l\'état'); // Pour le débogage
      this.error.set('Justification non trouvée');
      this.snackBar.open('Justification non trouvée', 'Fermer', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      this.router.navigate(['/dashboard/justifications']);
    }
  }

  validerJustification() {
    // Vérifier si l'ID de la justification est valide (supérieur à 0)
    if (!this.justificationId() || this.justificationId() <= 0) {
      console.error('Erreur: justificationId non valide pour validation.');
      this.snackBar.open('Impossible de valider: ID justification manquant.', 'Fermer', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    console.log('Valider Justification - ID:', this.justificationId());

    // Construction du DTO simple pour le service
    const dto = {
      enumJustification: 'Validee' // Valeur String attendue par le backend
    };

    console.log('Valider Justification - DTO envoyé:', dto);

    this.justificationService.validateJustification(this.justificationId().toString(), dto).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.snackBar.open('Justification validée avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/dashboard/justifications']);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.error.set(err.message || 'Une erreur est survenue lors de la validation');
        this.snackBar.open(this.error() || 'Une erreur est survenue', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  refuserJustification() {
    // Vérifier si l'ID de la justification est valide (supérieur à 0)
    if (!this.justificationId() || this.justificationId() <= 0) {
       console.error('Erreur: justificationId non valide pour refus.');
       this.snackBar.open('Impossible de refuser: ID justification manquant.', 'Fermer', {
         duration: 5000,
         panelClass: ['error-snackbar']
       });
       return;
     }

    console.log('Refuser Justification - ID:', this.justificationId());

    // Construction du DTO simple pour le service
    const dto = {
      enumJustification: 'Refusee' // Valeur String attendue par le backend
    };

    console.log('Refuser Justification - DTO envoyé:', dto);

    this.justificationService.rejectJustification(this.justificationId().toString(), dto).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.snackBar.open('Justification refusée avec succès', 'Fermer', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/dashboard/justifications']);
      },
      error: (err: Error) => {
        this.isLoading.set(false);
        this.error.set(err.message || 'Une erreur est survenue lors du refus');
        this.snackBar.open(this.error() || 'Une erreur est survenue', 'Fermer', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  isImage(url: string | undefined): boolean {
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp','.pdf','.docx'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }

  openPieceJointe(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}