import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LibraryLayout } from './library-layout';

describe('LibraryLayout', () => {
  let component: LibraryLayout;
  let fixture: ComponentFixture<LibraryLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryLayout],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
