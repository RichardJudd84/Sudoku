import { Component } from '@angular/core';
import { SudokuDataProvider } from '../../core/services/sudoku-data-provider';
import { SudokuPuzzle } from '../../sudoku/models/sudoku-models';
import { SudokuBoardComponent } from '../../sudoku/sudoku-board-component/sudoku-board-component';
import { SudokuControlsComponent } from '../../sudoku/sudoku-contols-component/sudoku-controls-component';
import { SudokuBuilder } from '../../core/services/sudoku-builder';
import { PlayControlComponent } from '../../sudoku/sudoku-contols-component/controls/play-control';
import { ResetControlComponent } from '../../sudoku/sudoku-contols-component/controls/reset-control';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puzzle-load',
  imports: [
    SudokuBoardComponent,
    SudokuControlsComponent,
    ResetControlComponent,
    PlayControlComponent,
  ],
  templateUrl: './puzzle-new.html',
  styleUrl: './puzzle-new.scss',
})
export class PuzzleNewComponent {
  protected puzzle: SudokuPuzzle;

  constructor(
    private readonly dataProvider: SudokuDataProvider,
    private readonly builder: SudokuBuilder,
    private readonly router: Router,
  ) {
    this.puzzle = this.builder.getNewPuzzle();
  }

  protected clearPuzzle() {
    this.puzzle = this.builder.getNewPuzzle();
  }

  protected play() {
    this.dataProvider.savePuzzle(this.puzzle);
    this.router.navigate(['play']);
  }
}
