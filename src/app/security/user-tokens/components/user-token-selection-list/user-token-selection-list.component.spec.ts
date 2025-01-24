import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { UserTokenSelectionListComponent } from './user-token-selection-list.component';

describe('UserTokenSelectionListComponent', () => {
  let component: UserTokenSelectionListComponent;
  let fixture: ComponentFixture<UserTokenSelectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UserTokenSelectionListComponent
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
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
