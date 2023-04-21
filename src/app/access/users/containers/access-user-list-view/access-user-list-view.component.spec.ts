import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserListViewComponent } from './access-user-list-view.component';

describe('AccessUserListViewComponent', () => {
  let component: AccessUserListViewComponent;
  let fixture: ComponentFixture<AccessUserListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PaginationModule,
        CoreModule,
        LayoutModule
      ],
      declarations: [
        AccessUserListViewComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
