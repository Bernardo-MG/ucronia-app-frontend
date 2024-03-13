import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeEditFormComponent } from './library-book-type-edit-form.component';

describe('LibraryBookTypeEditFormComponent', () => {
  let component: LibraryBookTypeEditFormComponent;
  let fixture: ComponentFixture<LibraryBookTypeEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
