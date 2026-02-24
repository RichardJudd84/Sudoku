import { Routes } from '@angular/router';
import { savedGameGuard } from './core/guards/saved-game-guard';
import { PuzzleNewComponent } from './views/puzzle-new/puzzle-new';
import { SudokuPlayComponent } from './views/sudoku-play/sudoku-play';
import { saveOnNavGuard } from './core/guards/save-on-nav-guard';

const titleBase = 'Sudoku';

export const routes: Routes = [
  {
    path: '',
    title: titleBase,
    redirectTo: 'play',
    pathMatch: 'full',
  },
  {
    path: 'play',
    title: titleBase + ': Solve puzzle',
    canActivate: [savedGameGuard],
    canDeactivate: [saveOnNavGuard],
    component: SudokuPlayComponent,
  },
  {
    path: 'new',
    title: titleBase + ': Enter puzzle',
    component: PuzzleNewComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
