export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type InputMode = 'VALUE' | 'POSSIBLE_VALUES';

export interface ISudokuCell {
  value?: CellValue | null;
  possibleValues: { [key in CellValue]: boolean };
  readonly: boolean;
}

export class SudokuCell implements ISudokuCell {
  value?: CellValue | null;
  possibleValues = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  };
  readonly: boolean = false;

  constructor(value?: CellValue) {
    this.value = value;
    if (value) {
      for (let i = 1; i <= 9; i++) {
        this.possibleValues[i as CellValue] = false;
      }
    }
  }
}
