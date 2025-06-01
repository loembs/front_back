import { Directive, ElementRef, HostListener, OnInit, OnDestroy, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appFormFieldValidation]', // L'attribut que vous utiliserez
  standalone: true // Important si vous utilisez des composants standalone
})
export class FormFieldValidationDirective implements OnInit, OnDestroy {

  private statusChangesSubscription: Subscription | undefined = undefined;

  // Injecte ElementRef pour l'accès au DOM et NgControl pour le contrôle de formulaire
  constructor(
    private el: ElementRef,
    @Optional() @Self() private control: NgControl // @Optional() et @Self() s'assurent que nous prenons le contrôle sur l'élément hôte s'il existe.
  ) { }

  ngOnInit(): void {
    if (this.control) {
      // Écoute les changements de statut du contrôle de formulaire
      this.statusChangesSubscription = this.control.statusChanges?.subscribe(() => {
        this.updateValidationClass();
      });

      // Applique la classe dès l'initialisation si le champ est déjà invalide et touché/modifié
      this.updateValidationClass();
    } else {
      console.warn('appFormFieldValidation directive requires an NgControl (e.g. ngModel or formControlName) on the host element.');
    }
  }

  @HostListener('blur') onBlur() {
    // Met à jour la classe lorsque le champ perd le focus (souvent utilisé pour marquer "touché")
    this.updateValidationClass();
  }

  // Méthode pour ajouter ou supprimer la classe CSS
  private updateValidationClass(): void {
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {
      // Si invalide ET touché ou modifié, ajoute la classe d'erreur
      this.el.nativeElement.classList.add('is-invalid-field');
    } else {
      // Sinon, retire la classe d'erreur
      this.el.nativeElement.classList.remove('is-invalid-field');
    }
  }

  ngOnDestroy(): void {
    // Nettoie l'abonnement lors de la destruction de la directive pour éviter les fuites de mémoire
    this.statusChangesSubscription?.unsubscribe();
  }
}