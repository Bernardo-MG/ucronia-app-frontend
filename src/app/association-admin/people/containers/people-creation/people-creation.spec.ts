import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PeopleCreation } from './people-creation';

describe('PeopleCreationContainer', () => {
  let component: PeopleCreation;
  let fixture: ComponentFixture<PeopleCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PeopleCreation
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
