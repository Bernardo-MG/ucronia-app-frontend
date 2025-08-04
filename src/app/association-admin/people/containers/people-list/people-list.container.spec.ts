import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PeopleListContainer } from './people-list.container';

describe('PeopleListContainer', () => {
  let component: PeopleListContainer;
  let fixture: ComponentFixture<PeopleListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PeopleListContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
