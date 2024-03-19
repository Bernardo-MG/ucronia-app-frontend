import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPublisherInfoEditorComponent } from './library-publisher-info-editor.component';

describe('LibraryPublisherInfoEditorComponent', () => {
  let component: LibraryPublisherInfoEditorComponent;
  let fixture: ComponentFixture<LibraryPublisherInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPublisherInfoEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryPublisherInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
