import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthentificationService} from '../../services/impl/authentification-mock.service';


@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent  {
    
    constructor(private authService: AuthentificationService, private router: Router) { }

    logout(): void {
        // Appeler la méthode de déconnexion de votre service d'authentification
        this.authService.logout();
        // Rediriger l'utilisateur vers la page de connexion (adaptez la route si nécessaire)
        this.router.navigate(['/security/login']);
    }
}

  
