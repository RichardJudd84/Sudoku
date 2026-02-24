import { Injectable } from '@angular/core';
import { CellValue, IPossibleValues, SudokuPuzzle } from '../../sudoku/models/sudoku-models';

@Injectable({
  providedIn: 'root',
})
export class SudokuUtils {
  resetGame(sudokuPuzzle: SudokuPuzzle) {
    sudokuPuzzle.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.readonly) {
          cell.value = undefined;
          this.clearPossibleValues(cell.possibleValues);
        }
      });
    });
  }

  clearPossibleValues(possibleValues: IPossibleValues) {
    for (const key in possibleValues) {
      possibleValues[key as CellValue] = false;
    }
  }
}
