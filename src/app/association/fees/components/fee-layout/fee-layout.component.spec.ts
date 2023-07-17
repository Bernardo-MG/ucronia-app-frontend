import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeLayoutComponent } from './fee-layout.component';

describe('FeeLayoutComponent', () => {
  let component: FeeLayoutComponent;
  let fixture: ComponentFixture<FeeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
