import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberService } from '../../services/member.service';
import { MemberStatsComponent } from './member-stats.component';
import { LayoutModule } from '@app/shared/layout/layout.module';

describe('MemberStatsComponent', () => {
  let component: MemberStatsComponent;
  let fixture: ComponentFixture<MemberStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule
      ],
      declarations: [
        MemberStatsComponent
      ],
      providers: [
        MemberService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
