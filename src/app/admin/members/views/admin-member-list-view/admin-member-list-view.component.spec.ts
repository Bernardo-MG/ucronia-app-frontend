import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberListViewComponent } from './admin-member-list-view.component';

describe('AdminMemberListViewComponent', () => {
  let component: AdminMemberListViewComponent;
  let fixture: ComponentFixture<AdminMemberListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMemberListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMemberListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
