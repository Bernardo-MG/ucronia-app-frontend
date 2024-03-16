import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeSelectionComponent } from './library-book-type-selection.component';

describe('LibraryBookTypeSelectionComponent', () => {
  let component: LibraryBookTypeSelectionComponent;
  let fixture: ComponentFixture<LibraryBookTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
