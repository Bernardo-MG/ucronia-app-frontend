import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeInfoEditorComponent } from './library-book-type-info-editor.component';

describe('LibraryBookTypeInfoEditorComponent', () => {
  let component: LibraryBookTypeInfoEditorComponent;
  let fixture: ComponentFixture<LibraryBookTypeInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeInfoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
