import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookDetailsComponent } from './library-book-details.component';

describe('LibraryBookDetailsComponent', () => {
  let component: LibraryBookDetailsComponent;
  let fixture: ComponentFixture<LibraryBookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
