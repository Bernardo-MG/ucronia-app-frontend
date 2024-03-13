import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberInfoComponent } from '../../components/member-info/member-info.component';
import { MemberService } from '../../services/member.service';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MemberDetailsComponent } from './member-details.component';

describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        LayoutModule,
        IconsModule
      ],
      declarations: [
        MemberDetailsComponent,
        MemberFormComponent,
        MemberInfoComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
