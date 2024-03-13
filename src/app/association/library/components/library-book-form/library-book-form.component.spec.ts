import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookFormComponent } from './library-book-form.component';

describe('LibraryBookFormComponent', () => {
  let component: LibraryBookFormComponent;
  let fixture: ComponentFixture<LibraryBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
