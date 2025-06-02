import { Component , Input } from '@angular/core';

@Component({
  selector: 'ism-hearder',
  imports: [],
  templateUrl: './hearder.component.html',
  styleUrl: './hearder.component.css'
})
export class HearderComponent {
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
