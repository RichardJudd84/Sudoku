import { CanDeactivateFn } from '@angular/router';

export interface SaveOnNav {
  saveGame: () => void;
}

export const saveOnNavGuard: CanDeactivateFn<SaveOnNav> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  component.saveGame();
  return true;
};
