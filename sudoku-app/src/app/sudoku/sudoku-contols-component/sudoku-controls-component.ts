import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faPlay, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sudoku-contols',
  imports: [FontAwesomeModule],
  templateUrl: './sudoku-controls-component.html',
  styleUrl: './sudoku-controls-component.scss',
})
export class SudokuControlsComponent {
  protected faFloppyDisk = faFloppyDisk;
  protected faSquarePlus = faSquarePlus;
  protected faPlay = faPlay;
  protected faArrowRotateRight = faArrowRotateRight;
}
