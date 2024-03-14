import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberInfoComponent } from '../member-info/member-info.component';
import { MemberService } from '../../services/member.service';
import { MemberFormComponent } from '../member-form/member-form.component';
import { MemberInfoEditorComponent } from './member-info-editor.component';

describe('MemberInfoEditorComponent', () => {
  let component: MemberInfoEditorComponent;
  let fixture: ComponentFixture<MemberInfoEditorComponent>;

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
        MemberInfoEditorComponent,
        MemberFormComponent,
        MemberInfoComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
