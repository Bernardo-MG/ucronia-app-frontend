import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { DataFormComponent } from '@app/core/components/data-form/data-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { MemberService } from '../../services/member.service';
import { MemberEditViewComponent } from './member-edit-view.component';

describe('MemberEditViewComponent', () => {
  let component: MemberEditViewComponent;
  let fixture: ComponentFixture<MemberEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ApiUiModule,
        FontAwesomeModule,
        ReactiveFormsModule
      ],
      declarations: [
        MemberEditViewComponent,
        DataFormComponent,
        MemberFormComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
