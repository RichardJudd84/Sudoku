import { Component, EventEmitter, Output } from '@angular/core';
import { IconControlComponent } from './icon-control/icon-control';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-save-control',
  imports: [IconControlComponent],
  template: '<app-icon-control [faIcon]="faFloppyDisk" (click)="click"/>',
})
export class SaveControlComponent {
  faFloppyDisk = faFloppyDisk;
  @Output() click = new EventEmitter<void>();
}
