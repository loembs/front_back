import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ism-hearder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hearder.component.html',
  styleUrl: './hearder.component.css'
})
export class HearderComponent {
  constructor(private router: Router) {}
  @Input() showActions: boolean = false;
  userInfo = {
photo: "https://randomuser.me/api/portraits/men/75.jpg",
login: "patrick@gmail.com",
nom: "Kane Diaby",
password: "1234", 
role: "Admin",
description:"Responsable des programmes Batiment ingénieur "
};
goToJustificatifs(): void {
  this.router.navigate(['/dashboard/justifications']);
}

}
