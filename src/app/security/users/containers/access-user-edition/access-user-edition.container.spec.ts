import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessUserService } from '../../services/access-user.service';
import { AccessUserEditionContainer } from './access-user-edition.container';

describe('AccessUserEditionContainer', () => {
  let component: AccessUserEditionContainer;
  let fixture: ComponentFixture<AccessUserEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessUserEditionContainer
      ],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
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
