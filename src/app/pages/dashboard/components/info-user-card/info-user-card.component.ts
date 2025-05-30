import { Component, Input } from '@angular/core';

@Component({
  selector: 'ism-info-user-card',
  imports: [
  ],
  templateUrl: './info-user-card.component.html',
  styleUrl: './info-user-card.component.css'
})
export class InfoUserCardComponent {
  @Input() showActions: boolean = false;
        userInfo = {
      photo: "https://randomuser.me/api/portraits/men/75.jpg",
      login: "patrick@gmail.com",
      nom: "Kane Diaby",
      password: "1234", 
      role: "Admin",
      description:"Responsable des programmes Batiment ingénieur "
  };
}
