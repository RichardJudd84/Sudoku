import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon-control',
  imports: [FontAwesomeModule],
  templateUrl: './icon-control.html',
  styleUrl: './icon-control.scss',
})
export class IconControlComponent {
  @Input({ required: true }) faIcon!: IconDefinition;
  @Output() click = new EventEmitter<void>();
}
