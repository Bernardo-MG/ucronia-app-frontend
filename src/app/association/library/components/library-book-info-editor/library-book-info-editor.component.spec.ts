import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookInfoEditorComponent } from './library-book-info-editor.component';

describe('LibraryBookInfoEditorComponent', () => {
  let component: LibraryBookInfoEditorComponent;
  let fixture: ComponentFixture<LibraryBookInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookInfoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
