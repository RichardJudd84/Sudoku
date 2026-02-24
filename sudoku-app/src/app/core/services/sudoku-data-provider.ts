import { Injectable } from '@angular/core';
import { SudokuPuzzle } from '../../sudoku/models/sudoku-models';

@Injectable({
  providedIn: 'root',
})
export class SudokuDataProvider {
  private readonly KEY = 'saved_puzzles';

  savePuzzle(puzzle: SudokuPuzzle) {
    localStorage.setItem(this.KEY, JSON.stringify(puzzle));
  }

  getPuzzle() {
    const puzzle = localStorage.getItem(this.KEY);
    if (!puzzle) {
      return undefined;
    } else {
      return JSON.parse(puzzle) as SudokuPuzzle;
    }
  }

  hasSavedPuzzled() {
    return !!localStorage.getItem(this.KEY);
  }
}
