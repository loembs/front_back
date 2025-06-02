import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverColor]',
  standalone: true
})
export class HoverColorDirective {
  private originalColor: string;

  constructor(private el: ElementRef) {
    this.originalColor = this.el.nativeElement.style.color;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.color = '#007bff';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.color = this.originalColor;
  }
} 