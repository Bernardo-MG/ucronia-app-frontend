import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PeopleListingContainer } from './people-listing.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('PeopleListingContainer', () => {
  let component: PeopleListingContainer;
  let fixture: ComponentFixture<PeopleListingContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        PeopleListingContainer],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();

    fixture = TestBed.createComponent(PeopleListingContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
