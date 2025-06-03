import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../../shared/services/impl/authentification-mock.service';
import { FormFieldValidationDirective } from '../../../shared/directives/form-field-validation.directive';
import { OrangeBackgroundDirective } from '../../../shared/directives/orange-background.directive';

@Component({
  selector: 'app-connexion-page',
  standalone: true,
  imports: [FormsModule, FormFieldValidationDirective, OrangeBackgroundDirective, CommonModule],
  templateUrl: './connexion-page.component.html',
  styleUrl: './connexion-page.component.css'
})
export class ConnexionPageComponent {
  login = '';
  password = '';
  errorMessage: string | null = null;

  private router = inject(Router);
  private authService = inject(AuthentificationService);

  async onLogin() {
    this.errorMessage = null;

    this.authService.login(this.login, this.password).subscribe({
      next: (user) => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        console.error('Erreur de connexion :', err);
      }
    });
  }
}
