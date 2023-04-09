import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/shared/data/components/form-frame/form-frame.component';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { MemberService } from '../../services/member.service';
import { MemberEditComponent } from './member-edit.component';

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
        ReactiveFormsModule
      ],
      declarations: [
        MemberEditComponent,
        DataFormComponent,
        MemberFormComponent
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
