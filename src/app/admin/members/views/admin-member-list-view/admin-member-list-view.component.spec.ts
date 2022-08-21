import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminMemberListViewComponent } from './admin-member-list-view.component';

describe('AdminMemberListViewComponent', () => {
  let component: AdminMemberListViewComponent;
  let fixture: ComponentFixture<AdminMemberListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AdminMemberListViewComponent
      ]
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
