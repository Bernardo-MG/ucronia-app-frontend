import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { SecurityUserService } from '../../services/security-user.service';
import { SecurityUserListViewComponent } from './security-user-list-view.component';

describe('SecurityUserListViewComponent', () => {
  let component: SecurityUserListViewComponent;
  let fixture: ComponentFixture<SecurityUserListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PaginationModule,
        CoreModule
      ],
      declarations: [
        SecurityUserListViewComponent
      ],
      providers: [
        SecurityUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityUserListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
