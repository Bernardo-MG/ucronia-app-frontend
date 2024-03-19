import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAuthorInfoEditorComponent } from './library-author-info-editor.component';

describe('LibraryAuthorInfoEditorComponent', () => {
  let component: LibraryAuthorInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAuthorInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAuthorInfoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
