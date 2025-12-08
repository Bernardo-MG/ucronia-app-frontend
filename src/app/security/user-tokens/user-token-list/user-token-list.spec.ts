import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTokenList } from './user-token-list';

describe('UserTokenList', () => {
  let component: UserTokenList;
  let fixture: ComponentFixture<UserTokenList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTokenList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTokenList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
