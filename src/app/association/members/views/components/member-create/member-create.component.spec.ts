import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberService } from '@app/association/members/core/services/member.service';
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
        MemberCreateComponent
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
