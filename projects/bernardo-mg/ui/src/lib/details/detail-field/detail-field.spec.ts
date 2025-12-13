import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailField } from './detail-field';

describe('DetailField', () => {
  let component: DetailField;
  let fixture: ComponentFixture<DetailField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
