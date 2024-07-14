import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookLendingsComponent } from './library-book-lendings.component';

describe('LibraryBookLendingsComponent', () => {
  let component: LibraryBookLendingsComponent;
  let fixture: ComponentFixture<LibraryBookLendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookLendingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookLendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
