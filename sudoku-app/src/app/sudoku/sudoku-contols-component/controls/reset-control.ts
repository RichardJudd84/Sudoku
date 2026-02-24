import { Component, EventEmitter, Output } from '@angular/core';
import { IconControlComponent } from './icon-control/icon-control';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-control',
  imports: [IconControlComponent],
  template: '<app-icon-control [faIcon]="faArrowRotateRight" (click)="click"/>',
})
export class ResetControlComponent {
  faArrowRotateRight = faArrowRotateRight;
  @Output() click = new EventEmitter<void>();
}
