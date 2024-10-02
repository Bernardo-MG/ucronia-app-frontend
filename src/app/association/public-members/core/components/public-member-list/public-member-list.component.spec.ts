import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberService } from '@app/association-admin/members/core/services/member.service';
import { PublicMemberListComponent } from './public-member-list.component';

describe('PublicMemberListComponent', () => {
  let component: PublicMemberListComponent;
  let fixture: ComponentFixture<PublicMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PublicMemberListComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PublicMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
