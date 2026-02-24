import { Component, Input } from '@angular/core';
import { SudokuCellComponent } from './sudoku-cell-component/sudoku-cell-component';
import { CellValue, InputMode, SudokuCell, SudokuPuzzle } from '../models/sudoku-models';
import { cellValues } from '../models/sudoku-constants';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPencil, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SudokuDataProvider } from '../../core/services/sudoku-data-provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sudoku-board',
  imports: [SudokuCellComponent, FontAwesomeModule],
  templateUrl: './sudoku-board-component.html',
  styleUrl: './sudoku-board-component.scss',
})
export class SudokuBoardComponent {
  faPenToSquare = faPenToSquare;
  faPencil = faPencil;
  faPen = faPen;

  protected readonly cellValues = cellValues;
  @Input({ required: true }) cells!: SudokuPuzzle;
  @Input() inputMode: InputMode = 'VALUE';

  protected selectedValue: CellValue = '1';

  constructor(
    private readonly dataProvider: SudokuDataProvider,
    private readonly router: Router,
  ) {}

  protected selectValue(value: CellValue) {
    this.selectedValue = value;
  }

  protected inputModeControlClicked() {
    switch (this.inputMode) {
      case 'VALUE': {
        this.inputMode = 'POSSIBLE_VALUES';
        break;
      }
      case 'POSSIBLE_VALUES': {
        this.inputMode = 'VALUE';
        break;
      }
    }
  }

  protected savePuzzle() {
    this.dataProvider.savePuzzle(this.cells);
    this.router.navigate(['/sudoku/play']);
  }
}
