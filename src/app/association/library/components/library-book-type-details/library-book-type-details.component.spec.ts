import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeDetailsComponent } from './library-book-type-details.component';

describe('LibraryBookTypeDetailsComponent', () => {
  let component: LibraryBookTypeDetailsComponent;
  let fixture: ComponentFixture<LibraryBookTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
