import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTypeList } from './fee-type-list';

describe('FeeTypeList', () => {
  let component: FeeTypeList;
  let fixture: ComponentFixture<FeeTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeTypeList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeTypeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
