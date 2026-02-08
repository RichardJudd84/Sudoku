import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SudokuCellComponent } from './components/sudoku-cell-component/sudoku-cell-component';
import { CellValue, InputMode, SudokuCell } from './models/sudoku-models';
import { cellValues } from './models/sudoku-constants';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sudoku-board',
  imports: [SudokuCellComponent, FontAwesomeModule],
  templateUrl: './sudoku-board-component.html',
  styleUrl: './sudoku-board-component.scss',
})
export class SudokuBoardComponent {
  faPenToSquare = faPenToSquare;
  faPencil = faPencil;

  protected readonly cellValues = cellValues;
  protected cells: SudokuCell[][] = [];
  protected selectedValue: CellValue = 1;
  protected inputMode: InputMode = 'VALUE';

  constructor(private readonly ref: ViewContainerRef) {
    for (let x = 0; x < 9; x++) {
      const row: SudokuCell[] = [];
      for (let y = 0; y < 9; y++) {
        row.push(new SudokuCell());
      }
      this.cells.push(row);
    }

    this.cells[0][3].value = 5;
    this.cells[0][3].value = 5;
    this.cells[1][7].value = 1;
    this.cells[6][2].value = 8;
    this.cells[3][5].value = 6;
    this.cells[0][3].readonly = true;
    this.cells[0][3].readonly = true;
    this.cells[1][7].readonly = true;
    this.cells[6][2].readonly = true;
    this.cells[3][5].readonly = true;
  }

  protected selectValue(value: CellValue) {
    this.selectedValue = value;
  }

  protected toggleInputMode() {
    this.inputMode = this.inputMode === 'VALUE' ? 'POSSIBLE_VALUES' : 'VALUE';
  }
}
