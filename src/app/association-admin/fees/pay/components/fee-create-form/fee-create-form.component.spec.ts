import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCreateFormComponent } from './fee-create-form.component';

describe('FeeCreateFormComponent', () => {
  let component: FeeCreateFormComponent;
  let fixture: ComponentFixture<FeeCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
