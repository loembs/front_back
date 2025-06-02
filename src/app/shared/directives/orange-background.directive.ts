import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appOrangeBackground]', // L'attribut que vous utiliserez
  standalone: true // Important si vous utilisez des composants standalone
})
export class OrangeBackgroundDirective implements OnInit {

  // Permet de passer une couleur optionnelle, sinon utilise la couleur par défaut
  @Input('appOrangeBackground') customColor = '#FA9620'; // Votre couleur orange par défaut

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // Applique la couleur de fond à l'élément hôte
    this.el.nativeElement.style.backgroundColor = this.customColor;
  }
}