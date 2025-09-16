import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaySelectMember } from './fee-pay-select-member';

describe('FeePaySelectMemberComponent', () => {
  let component: FeePaySelectMember;
  let fixture: ComponentFixture<FeePaySelectMember>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeePaySelectMember]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeePaySelectMember);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
