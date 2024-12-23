import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokenStatusComponent } from './user-token-status.component';

describe('UserTokenStatusComponent', () => {
  let component: UserTokenStatusComponent;
  let fixture: ComponentFixture<UserTokenStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTokenStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTokenStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
