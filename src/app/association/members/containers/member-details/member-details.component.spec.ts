import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { EditionModule } from '@app/shared/edition/edition.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { MemberService } from '../../services/member.service';
import { MemberDetailsComponent } from './member-details.component';

describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CoreModule,
        ReactiveFormsModule,
        LayoutModule,
        EditionModule
      ],
      declarations: [
        MemberDetailsComponent
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
