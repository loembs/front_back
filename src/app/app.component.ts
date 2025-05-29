import { Component } from '@angular/core';
import { HearderComponent } from './pages/dashboard/components/layout/hearder/hearder.component';
import { FooterComponent } from './pages/dashboard/components/layout/footer/footer.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';


@Component({
  standalone: true, // Ce composant peut charger d'autres composants
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  // template: `<h1>Angular 2 App</h1>`,
  styleUrl: './app.component.css'
  // styles:`h1 { color: #369; }`
})

// Le mot clé export permet de rendre la classe AppComponent accessible depuis d'autres fichiers



// Binding de données (data binding) : communication entre le composant et le template
//    * du composant(fichier ts) vers le template (fichier html) (envoie des données)
          // 1. Interpolation {{}}
          // 2. Property binding []
//    * du template (fichier html) vers le composant(fichier ts) (réception des données)
          // 3. Event binding ()
//    * les deux sens de communication
          // 4. Two-way binding [()]

export class AppComponent {
  private title: string | null = null;
}



