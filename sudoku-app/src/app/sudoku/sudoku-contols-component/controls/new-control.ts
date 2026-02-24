import { Component, EventEmitter, Output } from '@angular/core';
import { IconControlComponent } from './icon-control/icon-control';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-new-control',
  imports: [IconControlComponent],
  template: '<app-icon-control [faIcon]="faSquarePlus" (click)="click"/>',
})
export class NewControlComponent {
  faSquarePlus = faSquarePlus;
  @Output() click = new EventEmitter<void>();
}
