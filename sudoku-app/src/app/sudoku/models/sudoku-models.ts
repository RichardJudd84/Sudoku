export type CellValue = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export type InputMode = 'VALUE' | 'POSSIBLE_VALUES' | 'PUZZLE';

export type IPossibleValues = {
  [key in CellValue]: boolean;
};

export interface ISudokuCell {
  value?: CellValue | null;
  possibleValues: IPossibleValues;
  readonly: boolean;
}

export type SudokuPuzzle = ISudokuCell[][];

export class SudokuCell implements ISudokuCell {
  value?: CellValue | null;
  possibleValues = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  };
  readonly: boolean = false;

  constructor(value?: CellValue) {
    this.value = value;
    if (value) {
      for (let i = 1; i <= 9; i++) {
        this.possibleValues[i.toString() as CellValue] = false;
      }
    }
  }
}
