import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserEditionContainer } from './access-user-edition.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('AccessUserEditionContainer', () => {
  let component: AccessUserEditionContainer;
  let fixture: ComponentFixture<AccessUserEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        AccessUserEditionContainer],
    providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
