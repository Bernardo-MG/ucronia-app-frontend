import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserFormComponent } from '../access-user-form/access-user-form.component';
import { AccessUserCreateComponent } from './access-user-create.component';

describe('AccessUserCreateComponent', () => {
  let component: AccessUserCreateComponent;
  let fixture: ComponentFixture<AccessUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        LayoutModule,
        AccessUserCreateComponent,
        AccessUserFormComponent
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
