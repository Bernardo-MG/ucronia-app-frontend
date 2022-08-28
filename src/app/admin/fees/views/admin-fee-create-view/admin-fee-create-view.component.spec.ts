import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminFeeCreateViewComponent } from './admin-fee-create-view.component';

describe('AdminFeeCreateViewComponent', () => {
  let component: AdminFeeCreateViewComponent;
  let fixture: ComponentFixture<AdminFeeCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AdminFeeCreateViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminFeeCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
