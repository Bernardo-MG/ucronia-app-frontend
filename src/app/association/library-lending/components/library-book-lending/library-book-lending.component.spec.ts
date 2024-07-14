import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookLendingComponent } from './library-book-lending.component';

describe('LibraryBookLendingComponent', () => {
  let component: LibraryBookLendingComponent;
  let fixture: ComponentFixture<LibraryBookLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryBookLendingComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
