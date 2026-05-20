import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanDetailField } from './boolean-detail-field';

describe('BooleanDetailField', () => {
  let component: BooleanDetailField;
  let fixture: ComponentFixture<BooleanDetailField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooleanDetailField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooleanDetailField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
