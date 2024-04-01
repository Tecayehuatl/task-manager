import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appStrikeThrough]',
  standalone: true
})
export class StrikeThroughDirective {
  @Input() appStrikeThrough!: boolean;
  @Input() other!: string;

  constructor(private el: ElementRef) {
    console.log('Directive');
    // console.log(this.appStrikeThrough);
    // this.el.nativeElement.style.textDecoration = 'line-through';
    console.log(this.other);


    if (this.appStrikeThrough) {
    }
  }

}
