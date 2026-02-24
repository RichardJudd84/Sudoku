import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuCellComponent } from './sudoku-cell-component';

describe('SudokuCellComponent', () => {
  let component: SudokuCellComponent;
  let fixture: ComponentFixture<SudokuCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuCellComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
