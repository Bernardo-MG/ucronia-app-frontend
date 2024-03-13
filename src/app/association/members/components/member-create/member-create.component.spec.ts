import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberService } from '../../services/member.service';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MemberCreateComponent } from './member-create.component';

describe('MemberCreateComponent', () => {
  let component: MemberCreateComponent;
  let fixture: ComponentFixture<MemberCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MemberService
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        LayoutModule
      ],
      declarations: [
        MemberCreateComponent,
        MemberFormComponent
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
