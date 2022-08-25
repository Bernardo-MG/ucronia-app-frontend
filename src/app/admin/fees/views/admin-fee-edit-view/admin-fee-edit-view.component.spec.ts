import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminFeeEditViewComponent } from './admin-fee-edit-view.component';

describe('AdminFeeEditViewComponent', () => {
  let component: AdminFeeEditViewComponent;
  let fixture: ComponentFixture<AdminFeeEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AdminFeeEditViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminFeeEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
