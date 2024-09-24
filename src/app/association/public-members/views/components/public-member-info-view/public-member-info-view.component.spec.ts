import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberService } from '@app/association-admin/members/core/services/member.service';
import { PublicMemberInfoEditorComponent } from './public-member-info-view.component';

describe('MemberInfoEditorComponent', () => {
  let component: PublicMemberInfoEditorComponent;
  let fixture: ComponentFixture<PublicMemberInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        PublicMemberInfoEditorComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicMemberInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
