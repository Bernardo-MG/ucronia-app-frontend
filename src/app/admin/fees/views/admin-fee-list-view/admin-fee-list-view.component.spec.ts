import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminFeeListViewComponent } from './admin-fee-list-view.component';

describe('AdminFeeListViewComponent', () => {
  let component: AdminFeeListViewComponent;
  let fixture: ComponentFixture<AdminFeeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AdminFeeListViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminFeeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
