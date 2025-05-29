import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavComponent} from '../../shared/components/nav/nav.component';

@Component({
  selector: 'ism-security',
  imports: [
    RouterOutlet,
    NavComponent
  ],
  templateUrl: './security.component.html',
  styleUrl: './security.component.css'
})
export class SecurityComponent {

}
