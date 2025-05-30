import { Component } from '@angular/core';
import { JustificationService } from '../../../shared/services/impl/justification.service';
import { ValidateJustificationDto } from '../../../shared/models/dto/Request/validateJustificationDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ism-page-validation-justification',
  imports: [
  ],
  templateUrl: './page-validation-justification.component.html',
  styleUrl: './page-validation-justification.component.css'
})
export class PageValidationJustificationComponent{
      justification: any;
    justificationId: number = 0;
    isLoading: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router) {
      const navigation = this.router.getCurrentNavigation();

      if (navigation?.extras.state) {
        this.justification = navigation.extras.state['justification'];
        console.log('Justification data received via state:', this.justification);
      } else {
        console.log('No justification data received via state. Page might have been refreshed or accessed directly.');
        // Ici, vous devriez ajouter la logique pour charger la justification
        // en utilisant this.justificationId (récupéré via route.params)
        // Exemple : this.justificationService.getJustificationById(this.justificationId).subscribe(...);
      }

      this.route.params.subscribe(params => {
        this.justificationId = +params['justification_id'];
        console.log('Justification ID from route params:', this.justificationId);
      });
    }

    validateJustification(): void {
   
    }
    refuseJustification(): void {
   
    }

  
}
