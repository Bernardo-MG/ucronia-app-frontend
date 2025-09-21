import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessUserService } from '../access-user-service';
import { AccessUserEdition } from './access-user-edition';

describe('AccessUserEdition', () => {
  let component: AccessUserEdition;
  let fixture: ComponentFixture<AccessUserEdition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessUserEdition
      ],
      providers: [
        AccessUserService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserEdition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
