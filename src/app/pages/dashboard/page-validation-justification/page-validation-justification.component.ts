import { Component, inject, signal } from '@angular/core';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { ValidateJustificationDto } from '../../../shared/models/dto/Request/validateJustificationDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
export class PageValidationJustificationComponent {
    justification = signal<any>(null);
    justificationId = signal<number>(0);
    isLoading = signal<boolean>(false);
    error = signal<string | null>(null);

    private justificationService = inject(JustificationService);
    private snackBar = inject(MatSnackBar);

    constructor(private route: ActivatedRoute, private router: Router) {
      const navigation = this.router.getCurrentNavigation();

      if (navigation?.extras.state) {
        this.justification.set(navigation.extras.state['justification']);
        console.log('Justification data received via state:', this.justification());
      } else {
        console.log('No justification data received via state. Page might have been refreshed or accessed directly.');
      }

      this.route.params.subscribe(params => {
        this.justificationId.set(+params['justification_id']);
        console.log('Justification ID from route params:', this.justificationId());
      });
    }

    validateJustification(): void {
      this.isLoading.set(true);
      this.error.set(null);

      const validateDto: ValidateJustificationDto = {
        justificationId: this.justificationId(),
        nom: this.justification()?.nom || '',
        matricule: this.justification()?.matricule || '',
        date: this.justification()?.date || new Date(),
        cours: this.justification()?.cours || '',
        action: 'VALIDATED',
        commentaire: 'Justification validée par le responsable',
        adminId: 1 // À remplacer par l'ID de l'admin connecté
      };

      this.justificationService.validateJustification(validateDto).subscribe({
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

    refuseJustification(): void {
      this.isLoading.set(true);
      this.error.set(null);

      const validateDto: ValidateJustificationDto = {
        justificationId: this.justificationId(),
        nom: this.justification()?.nom || '',
        matricule: this.justification()?.matricule || '',
        date: this.justification()?.date || new Date(),
        cours: this.justification()?.cours || '',
        action: 'REFUSED',
        commentaire: 'Justification refusée par le responsable',
        adminId: 1 // À remplacer par l'ID de l'admin connecté
      };

      this.justificationService.validateJustification(validateDto).subscribe({
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
}
