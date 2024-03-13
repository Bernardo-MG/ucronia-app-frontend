import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeInfoComponent } from './library-book-type-info.component';

describe('LibraryBookTypeInfoComponent', () => {
  let component: LibraryBookTypeInfoComponent;
  let fixture: ComponentFixture<LibraryBookTypeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
