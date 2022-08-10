import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMemberInfoViewComponent } from './admin-member-info-view.component';

describe('AdminMemberInfoViewComponent', () => {
  let component: AdminMemberInfoViewComponent;
  let fixture: ComponentFixture<AdminMemberInfoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMemberInfoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMemberInfoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
