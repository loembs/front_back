import { Component } from '@angular/core';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HearderComponent} from './components/layout/hearder/hearder.component';
import {InfoUserCardComponent} from './components/info-user-card/info-user-card.component';
import {RouterOutlet} from '@angular/router';
import { NavComponent } from '../../shared/components/nav/nav.component';
@Component({
  selector: 'ism-dashboard',
  imports: [
    FooterComponent,
    HearderComponent,
    InfoUserCardComponent,
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
