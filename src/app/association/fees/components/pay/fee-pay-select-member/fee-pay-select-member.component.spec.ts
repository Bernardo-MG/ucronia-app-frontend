import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaySelectMemberComponent } from './fee-pay-select-member.component';

describe('FeePaySelectMemberComponent', () => {
  let component: FeePaySelectMemberComponent;
  let fixture: ComponentFixture<FeePaySelectMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeePaySelectMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeePaySelectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
