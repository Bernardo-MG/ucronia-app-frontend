import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeSelectionListComponent } from './fee-selection-list.component';

describe('FeeSelectionListComponent', () => {
  let component: FeeSelectionListComponent;
  let fixture: ComponentFixture<FeeSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeSelectionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
