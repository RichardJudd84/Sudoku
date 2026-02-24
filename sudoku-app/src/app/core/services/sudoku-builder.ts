import { Injectable } from '@angular/core';
import {
  SudokuPuzzle,
  SudokuCell,
  ISudokuCell,
  CellValue,
} from '../../sudoku/models/sudoku-models';

@Injectable({
  providedIn: 'root',
})
export class SudokuBuilder {
  getNewPuzzle() {
    const sudokuPuzzle: SudokuPuzzle = [];
    for (let x = 0; x < 9; x++) {
      const row: SudokuCell[] = [];
      for (let y = 0; y < 9; y++) {
        row.push(this.getNewCell());
      }
      sudokuPuzzle.push(row);
    }

    return sudokuPuzzle;
  }

  getNewCell(cellValue?: CellValue): ISudokuCell {
    return {
      value: cellValue ?? null,
      readonly: !!cellValue,
      possibleValues: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
      },
    };
  }
}
