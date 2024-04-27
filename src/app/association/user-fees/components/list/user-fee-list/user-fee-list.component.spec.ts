import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFeeListComponent } from './user-fee-list.component';

describe('UserFeeListComponent', () => {
  let component: UserFeeListComponent;
  let fixture: ComponentFixture<UserFeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFeeListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
