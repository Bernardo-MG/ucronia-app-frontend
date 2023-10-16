import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokenSelectionListComponent } from './user-token-selection-list.component';

describe('UserTokenSelectionListComponent', () => {
  let component: UserTokenSelectionListComponent;
  let fixture: ComponentFixture<UserTokenSelectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTokenSelectionListComponent]
    });
    fixture = TestBed.createComponent(UserTokenSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
