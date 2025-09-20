import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PeopleInfoEdition } from './people-edition';

describe('PeopleInfoEdition', () => {
  let component: PeopleInfoEdition;
  let fixture: ComponentFixture<PeopleInfoEdition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PeopleInfoEdition
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleInfoEdition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
