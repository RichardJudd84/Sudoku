import { Component, EventEmitter, Output } from '@angular/core';
import { IconControlComponent } from './icon-control/icon-control';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-play-control',
  imports: [IconControlComponent],
  template: '<app-icon-control [faIcon]="faPlay" (click)="click"/>',
})
export class PlayControlComponent {
  faPlay = faPlay;
  @Output() click = new EventEmitter<void>();
}
