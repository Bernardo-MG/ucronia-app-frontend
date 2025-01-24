import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PeopleInfoEditionContainer } from './people-edition.container';

describe('PeopleInfoEditionContainer', () => {
  let component: PeopleInfoEditionContainer;
  let fixture: ComponentFixture<PeopleInfoEditionContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PeopleInfoEditionContainer
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleInfoEditionContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
