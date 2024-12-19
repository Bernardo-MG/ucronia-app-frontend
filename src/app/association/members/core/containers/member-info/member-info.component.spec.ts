import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberService } from '@app/association/members/core/services/member.service';
import { MemberInfoComponent } from './member-info.component';

describe('MemberInfoEditorComponent', () => {
  let component: MemberInfoComponent;
  let fixture: ComponentFixture<MemberInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MemberInfoComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
