import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SudokuBoardComponent } from '../../sudoku/sudoku-board-component/sudoku-board-component';
import { SudokuControlsComponent } from '../../sudoku/sudoku-contols-component/sudoku-controls-component';
import { SudokuDataProvider } from '../../core/services/sudoku-data-provider';
import { SudokuPuzzle } from '../../sudoku/models/sudoku-models';
import { SudokuUtils } from '../../core/services/sudoku-utils';
import { ResetControlComponent } from '../../sudoku/sudoku-contols-component/controls/reset-control';
import { NewControlComponent } from '../../sudoku/sudoku-contols-component/controls/new-control';
import { Router } from '@angular/router';
import { SaveOnNav } from '../../core/guards/save-on-nav-guard';

@Component({
  selector: 'app-sudoku-play',
  imports: [
    SudokuBoardComponent,
    SudokuControlsComponent,
    ResetControlComponent,
    NewControlComponent,
  ],
  templateUrl: './sudoku-play.html',
  styleUrl: './sudoku-play.scss',
})
export class SudokuPlayComponent implements SaveOnNav {
  puzzle: SudokuPuzzle = [];
  constructor(
    private readonly dataProvider: SudokuDataProvider,
    private readonly utils: SudokuUtils,
    private readonly router: Router,
  ) {
    this.puzzle = this.dataProvider.getPuzzle() ?? [];
  }

  @HostListener('window:beforeunload')
  saveGame() {
    this.dataProvider.savePuzzle(this.puzzle);
  }

  resetGame() {
    this.utils.resetGame(this.puzzle);
  }

  newGame() {
    this.router.navigate(['new']);
  }
}
