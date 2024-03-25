import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberBalanceService } from '../../services/member-balance.service';
import { MemberService } from '../../services/member.service';
import { MemberFrontpageComponent } from './member-frontpage.component';

describe('MemberFrontpageComponent', () => {
  let component: MemberFrontpageComponent;
  let fixture: ComponentFixture<MemberFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MemberFrontpageComponent
      ],
      providers: [
        MemberService,
        MemberBalanceService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
