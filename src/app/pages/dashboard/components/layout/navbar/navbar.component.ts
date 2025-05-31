import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout(): void {
    // À adapter selon ton système d'auth
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
