import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { MemberService } from '../../services/member.service';
import { MemberSelectionListComponent } from './member-selection-list.component';

describe('MemberSelectionListComponent', () => {
  let component: MemberSelectionListComponent;
  let fixture: ComponentFixture<MemberSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [ 
        MemberSelectionListComponent 
      ],
      providers: [
        MemberService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
