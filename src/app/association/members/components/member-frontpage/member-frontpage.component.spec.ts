import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberService } from '../../services/member.service';
import { MemberSelectionListComponent } from '../member-selection-list/member-selection-list.component';
import { MemberFrontpageComponent } from './member-frontpage.component';

describe('MemberFrontpageComponent', () => {
  let component: MemberFrontpageComponent;
  let fixture: ComponentFixture<MemberFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        PaginationModule,
        LayoutModule,
        FontAwesomeModule
      ],
      declarations: [
        MemberFrontpageComponent,
        MemberSelectionListComponent
      ],
      providers: [
        MemberService
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