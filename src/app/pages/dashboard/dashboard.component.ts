import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HearderComponent } from "./components/layout/hearder/hearder.component";

@Component({
  selector: 'ism-dashboard',
  imports: [RouterOutlet, HearderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
