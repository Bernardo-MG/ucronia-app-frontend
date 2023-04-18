import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FormFrameComponent } from '@app/shared/layout/components/form-frame/form-frame.component';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberService } from '../../services/member.service';
import { MemberCreateComponent } from './member-create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';

describe('MemberCreateComponent', () => {
  let component: MemberCreateComponent;
  let fixture: ComponentFixture<MemberCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MemberService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        IconsModule,
        LayoutModule
      ],
      declarations: [
        MemberCreateComponent,
        FormFrameComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
