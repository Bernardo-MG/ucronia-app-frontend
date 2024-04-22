import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemberService } from '../../../services/member.service';
import { MemberListWidgetComponent } from './member-list-widget.component';

describe('MemberListWidgetComponent', () => {
  let component: MemberListWidgetComponent;
  let fixture: ComponentFixture<MemberListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MemberListWidgetComponent
      ],
      providers: [
        MemberService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
