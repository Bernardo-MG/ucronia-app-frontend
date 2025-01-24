import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PeopleCreationContainer } from './people-creation.container';

describe('PeopleCreationContainer', () => {
  let component: PeopleCreationContainer;
  let fixture: ComponentFixture<PeopleCreationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PeopleCreationContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleCreationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
