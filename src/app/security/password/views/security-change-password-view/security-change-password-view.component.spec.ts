import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityChangePasswordService } from '../../service/security-change-password.service';

import { SecurityChangePasswordViewComponent } from './security-change-password-view.component';

describe('SecurityChangePasswordViewComponent', () => {
  let component: SecurityChangePasswordViewComponent;
  let fixture: ComponentFixture<SecurityChangePasswordViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SecurityChangePasswordService
      ],
      declarations: [
        SecurityChangePasswordViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityChangePasswordViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
