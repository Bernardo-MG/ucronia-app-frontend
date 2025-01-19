import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenSelectionListComponent } from './user-token-selection-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserTokenSelectionListComponent', () => {
  let component: UserTokenSelectionListComponent;
  let fixture: ComponentFixture<UserTokenSelectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        UserTokenSelectionListComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    fixture = TestBed.createComponent(UserTokenSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
