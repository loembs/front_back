import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStore } from '../../../shared/store/app.store';
import { LoginRequestDto } from '../../../shared/models/dto/Request/login.dto';
import { Utilisateur, Role } from '../../../shared/models/utilisateur.model';
import { FormFieldValidationDirective } from '../../../shared/directives/form-field-validation.directive';
import { OrangeBackgroundDirective } from '../../../shared/directives/orange-background.directive';
import { CommonModule } from '@angular/common';
interface LoginResponseDto {
  success: boolean;
  message: string;
  user?: Utilisateur;
  token?: string;
}

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
  private store = inject(AppStore);

  // Données fictives d'utilisateurs
  private users: Utilisateur[] = [
    {
      login: 'admin',
      password: 'admin',
      role: 'Admin',
      listPointage: []
    },
  ];

  async onLogin() {
    this.errorMessage = null;
    const loginRequest: LoginRequestDto = {
      login: this.login,
      password: this.password,
    };

    // Simuler un appel API avec de fausses données
    const fakeResponse: LoginResponseDto = this.simulateLogin(loginRequest);

    if (fakeResponse.success) {
      // Simuler la sauvegarde du token et de l'utilisateur
      localStorage.setItem('token', fakeResponse.token || '');
      this.store.setCurrentUser(fakeResponse.user);
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = fakeResponse.message;
    }
  }

  private simulateLogin(request: LoginRequestDto): LoginResponseDto {
    // Logique d'authentification factice: trouver l'utilisateur par login et vérifier le mot de passe
    const foundUser = this.users.find(user => user.login === request.login);

    if (foundUser && foundUser.password === request.password) {
      // Supprimer le mot de passe avant de le retourner, car il n'est pas censé être dans le modèle après authentification
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;

      return {
        success: true,
        message: 'Authentification réussie',
        user: userWithoutPassword as Utilisateur,
        token: `fake-token-${foundUser.login}`,
      };
    } else {
      return {
        success: false,
        message: 'Nom d\'utilisateur ou mot de passe incorrect',
      };
    }
  }
} 