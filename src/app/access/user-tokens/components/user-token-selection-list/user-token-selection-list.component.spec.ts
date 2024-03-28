import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { UserTokenSelectionListComponent } from './user-token-selection-list.component';

describe('UserTokenSelectionListComponent', () => {
  let component: UserTokenSelectionListComponent;
  let fixture: ComponentFixture<UserTokenSelectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        LayoutModule,
        PaginationModule,
        UserTokenSelectionListComponent
      ]
    });
    fixture = TestBed.createComponent(UserTokenSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
