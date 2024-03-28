import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { UserTokenSelectionListComponent } from '../user-token-selection-list/user-token-selection-list.component';
import { UserTokenFrontpageComponent } from './user-token-frontpage.component';

describe('UserTokenFrontpageComponent', () => {
  let component: UserTokenFrontpageComponent;
  let fixture: ComponentFixture<UserTokenFrontpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LayoutModule,
        PaginationModule,
        UserTokenFrontpageComponent,
        UserTokenSelectionListComponent
      ]
    });
    fixture = TestBed.createComponent(UserTokenFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
