import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityRegisterService } from '../../service/security-register.service';

import { SecurityRegisterViewComponent } from './security-register-view.component';

describe('SecurityRegisterViewComponent', () => {
  let component: SecurityRegisterViewComponent;
  let fixture: ComponentFixture<SecurityRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        SecurityRegisterService
      ],
      declarations: [
        SecurityRegisterViewComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
