import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@app/core/core.module';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserListComponent } from './access-user-list.component';
import { AccessUserSelectionListComponent } from '../access-user-selection-list/access-user-selection-list.component';

describe('AccessUserListComponent', () => {
  let component: AccessUserListComponent;
  let fixture: ComponentFixture<AccessUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PaginationModule,
        CoreModule,
        LayoutModule,
        FontAwesomeModule
      ],
      declarations: [
        AccessUserListComponent,
        AccessUserSelectionListComponent
      ],
      providers: [
        AccessUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
