import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryFictionBookDetailsComponent } from './library-fiction-book-details.component';

describe('LibraryFictionBookDetailsComponent', () => {
  let component: LibraryFictionBookDetailsComponent;
  let fixture: ComponentFixture<LibraryFictionBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryFictionBookDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryFictionBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
