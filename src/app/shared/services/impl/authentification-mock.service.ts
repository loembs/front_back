import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, Role, Utilisateur } from '../../models/utilisateur.model';
import { IAuthentification } from '../IAuthentification.service';
import { Observable, of, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService implements IAuthentification {
  
  private readonly API_URL = 'https://backgroupe6.onrender.com/api/utilisateur';
  
  // Signal pour gérer l'état de connexion
   readonly isLoggedInSignal = signal<boolean>(false);
   readonly currentUser = signal<Utilisateur | null>(null);

  constructor(private http: HttpClient) {
    // Vérifier si l'utilisateur est déjà connecté au démarrage
    this.checkAuthStatus();
  }

  login(username: string, password: string): Observable<Utilisateur> {
        const loginData = {
        login: username,
        password: password
      };


    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.API_URL}/login`, loginData, { headers })
      .pipe(
        map((response: LoginResponse) => {
          console.log('Réponse Login reçue :', response);
          if (response?.token) {
            this.saveAuthData(response);
            this.isLoggedInSignal.set(true);
            this.currentUser.set(response.user);
          }
          return response.user;
        }),
        catchError((error) => {
          console.error('Erreur lors de la connexion:', error);
          this.isLoggedInSignal.set(false);
          this.currentUser.set(null);
          throw error;
        })
      );
  }

  /**
   * Méthode de déconnexion
   */
  logout(): Observable<void> {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.isLoggedInSignal.set(false);
    this.currentUser.set(null);
    return of(void 0);
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return this.isLoggedInSignal();
  }

  /**
   * Obtenir l'utilisateur actuel
   */
  getCurrentUser(): Utilisateur | null {
    return this.currentUser();
  }

  /**
   * Obtenir le token d'authentification
   */
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Sauvegarder les données d'authentification
   */
  private saveAuthData(loginResponse: LoginResponse): void {
    if (loginResponse.token) {
      localStorage.setItem('authToken', loginResponse.token);
    }
    if (loginResponse.user) {
      localStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
    }
  }

  /**
   * Vérifier le statut d'authentification au démarrage
   */
  private checkAuthStatus(): void {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('currentUser');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.isLoggedInSignal.set(true);
        this.currentUser.set(user);
      } catch (error) {
        console.error('Erreur lors de la lecture des données utilisateur:', error);
        this.logout(); // Nettoyer les données corrompues
      }
    }
  }

  /**
   * Créer les headers avec le token d'authentification
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.isLoggedInSignal());
  }
}