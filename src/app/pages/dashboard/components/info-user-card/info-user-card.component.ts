import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ism-info-user-card',
  imports: [],
  templateUrl: './info-user-card.component.html',
  styleUrls: ['./info-user-card.component.css']
})
export class InfoUserCardComponent {

  constructor(private router: Router) {}

goToJustificatifs(): void {
  this.router.navigate(['/dashboard/justifications']);
}


}


