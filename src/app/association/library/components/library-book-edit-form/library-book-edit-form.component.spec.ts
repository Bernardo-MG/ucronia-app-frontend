import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookEditFormComponent } from './library-book-edit-form.component';

describe('LibraryBookEditFormComponent', () => {
  let component: LibraryBookEditFormComponent;
  let fixture: ComponentFixture<LibraryBookEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
