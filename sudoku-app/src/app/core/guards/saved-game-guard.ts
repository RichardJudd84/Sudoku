import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SudokuDataProvider } from '../services/sudoku-data-provider';

export const savedGameGuard: CanActivateFn = (route, state) => {
  const dataProvider = inject(SudokuDataProvider);
  const router = inject(Router);
  if (dataProvider.hasSavedPuzzled()) {
    return true;
  } else {
    return router.createUrlTree(['new']);
  }
};
