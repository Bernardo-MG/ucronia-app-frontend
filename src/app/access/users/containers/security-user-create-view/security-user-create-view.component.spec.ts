import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/core/layout/components/data-form/data-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SecurityUserFormComponent } from '../../components/security-user-form/security-user-form.component';
import { SecurityUserService } from '../../services/security-user.service';

import { SecurityUserCreateViewComponent } from './security-user-create-view.component';

describe('SecurityUserCreateViewComponent', () => {
  let component: SecurityUserCreateViewComponent;
  let fixture: ComponentFixture<SecurityUserCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        SecurityUserCreateViewComponent,
        DataFormComponent,
        SecurityUserFormComponent
      ],
      providers: [
        SecurityUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityUserCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
