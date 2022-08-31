import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeEditViewComponent } from './fee-edit-view.component';

describe('FeeEditViewComponent', () => {
  let component: FeeEditViewComponent;
  let fixture: ComponentFixture<FeeEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
