import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ISudokuCell, CellValue, InputMode } from '../../models/sudoku-models';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-sudoku-cell',
  imports: [FormsModule, KeyValuePipe],
  templateUrl: './sudoku-cell-component.html',
  styleUrl: './sudoku-cell-component.scss',
})
export class SudokuCellComponent {
  @Input({ required: true }) cell!: ISudokuCell;
  @Input({ required: true }) selectedValue!: CellValue;
  @Input({ required: true }) inputMode!: InputMode;
  @Output() selectedValueChange = new EventEmitter<CellValue>();

  protected cellClicked() {
    this.setCellValue(this.selectedValue);
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (allowedKeys.includes(event.key)) {
      const newValue = event.key as CellValue;
      this.setCellValue(newValue);
      this.selectedValueChange.emit(newValue);
    }
  }

  private setCellValue(value: CellValue) {
    switch (this.inputMode) {
      case 'VALUE': {
        if (!this.cell.readonly) {
          this.cell.value = this.cell.value === value ? null : value;
        }
        break;
      }
      case 'POSSIBLE_VALUES': {
        if (!this.cell.readonly) {
          this.cell.possibleValues[value] = !this.cell.possibleValues[value];
        }
        break;
      }
      case 'PUZZLE': {
        this.cell.value = this.cell.value === value ? null : value;
        this.cell.readonly = this.cell.value !== null;
        break;
      }
    }
  }
}
