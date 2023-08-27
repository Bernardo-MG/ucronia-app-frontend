import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserCreateFormComponent } from '../access-user-create-form/access-user-create-form.component';
import { AccessUserCreateComponent } from './access-user-create.component';

describe('AccessUserCreateComponent', () => {
  let component: AccessUserCreateComponent;
  let fixture: ComponentFixture<AccessUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        IconsModule,
        LayoutModule
      ],
      declarations: [
        AccessUserCreateComponent,
        AccessUserCreateFormComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
