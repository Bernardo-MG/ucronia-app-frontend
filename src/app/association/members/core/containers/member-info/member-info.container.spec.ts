import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberService } from '@app/association/members/core/services/member.service';
import { MemberInfoContainer } from './member-info.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MemberInfoContainer', () => {
  let component: MemberInfoContainer;
  let fixture: ComponentFixture<MemberInfoContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        MemberInfoContainer],
    providers: [
        MemberService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
