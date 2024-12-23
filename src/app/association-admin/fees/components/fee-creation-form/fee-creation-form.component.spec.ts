import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCreationFormComponent } from './fee-creation-form.component';

describe('FeeCreationFormComponent', () => {
  let component: FeeCreationFormComponent;
  let fixture: ComponentFixture<FeeCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeCreationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
