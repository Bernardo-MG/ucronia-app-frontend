import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemInfoEditorComponent } from './library-game-system-info-editor.component';

describe('LibraryGameSystemInfoEditorComponent', () => {
  let component: LibraryGameSystemInfoEditorComponent;
  let fixture: ComponentFixture<LibraryGameSystemInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemInfoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
