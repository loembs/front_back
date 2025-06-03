import { Component, inject } from '@angular/core';
import { HearderComponent } from './pages/dashboard/components/layout/hearder/hearder.component';
import { FooterComponent } from './pages/dashboard/components/layout/footer/footer.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet ,NavComponent , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Front-Patrick';
  showNavbar = false; 

  private router = inject(Router);

  constructor() {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe((event: NavigationEnd) => {
    this.showNavbar = !event.urlAfterRedirects.includes('/security');
  });
}
}



