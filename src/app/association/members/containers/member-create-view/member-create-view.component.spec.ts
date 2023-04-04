import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/core/layout/components/data-form/data-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { MemberService } from '../../services/member.service';
import { MemberCreateViewComponent } from './member-create-view.component';

describe('MemberCreateViewComponent', () => {
  let component: MemberCreateViewComponent;
  let fixture: ComponentFixture<MemberCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MemberService
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        MemberCreateViewComponent,
        DataFormComponent,
        MemberFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
