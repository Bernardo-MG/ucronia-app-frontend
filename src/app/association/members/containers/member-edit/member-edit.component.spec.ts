import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFrameComponent } from '@app/shared/layout/components/form-frame/form-frame.component';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberService } from '../../services/member.service';
import { MemberEditComponent } from './member-edit.component';
import { LayoutModule } from '@app/shared/layout/layout.module';

describe('MemberEditComponent', () => {
  let component: MemberEditComponent;
  let fixture: ComponentFixture<MemberEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        MemberEditComponent,
        FormFrameComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
