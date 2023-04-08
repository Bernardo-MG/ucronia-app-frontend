import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DataFormComponent } from '@app/core/layout/components/data-form/data-form.component';
import { CoreModule } from '@app/core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberFormComponent } from '../../components/member-form/member-form.component';
import { MemberService } from '../../services/member.service';
import { MemberEditViewComponent } from './member-edit.component';

describe('MemberEditViewComponent', () => {
  let component: MemberEditViewComponent;
  let fixture: ComponentFixture<MemberEditViewComponent>;

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
