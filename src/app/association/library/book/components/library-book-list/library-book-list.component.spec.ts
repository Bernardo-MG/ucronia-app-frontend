import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookListComponent } from './library-book-list.component';

describe('LibraryBookListComponent', () => {
  let component: LibraryBookListComponent;
  let fixture: ComponentFixture<LibraryBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
