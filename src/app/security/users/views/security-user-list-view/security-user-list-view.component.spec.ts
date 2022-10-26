import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityUserListViewComponent } from './security-user-list-view.component';

describe('SecurityUserListViewComponent', () => {
  let component: SecurityUserListViewComponent;
  let fixture: ComponentFixture<SecurityUserListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityUserListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityUserListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
