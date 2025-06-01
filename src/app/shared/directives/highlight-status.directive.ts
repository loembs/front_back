import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[highlightStatus]' // attribut personnalisé
})
export class HighlightStatusDirective implements OnChanges {

  @Input('highlightStatus') status: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.status === 'En attente') {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#f7941d');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '#ffffff');
      this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
    }
  }
}

