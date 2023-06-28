import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AcessRegisterFormComponent } from '../access-register-form/access-register-form.component';
import { AccessRegisterService } from '../../services/access-register.service';
import { AccessRegisterViewComponent } from './access-register-view.component';

describe('AccessRegisterViewComponent', () => {
  let component: AccessRegisterViewComponent;
  let fixture: ComponentFixture<AccessRegisterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        AccessRegisterService
      ],
      declarations: [
        AccessRegisterViewComponent,
        AcessRegisterFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
