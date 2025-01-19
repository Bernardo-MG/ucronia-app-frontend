import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserCreationContainer } from './access-user-creation.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessUserCreationContainer', () => {
  let component: AccessUserCreationContainer;
  let fixture: ComponentFixture<AccessUserCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        ReactiveFormsModule,
        AccessUserCreationContainer],
    providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
