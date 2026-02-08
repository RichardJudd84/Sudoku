import { Component } from '@angular/core';
import { SudokuBoardComponent } from '../../shared/components/sudoku-board-component/sudoku-board-component';

@Component({
  selector: 'app-home',
  imports: [SudokuBoardComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
