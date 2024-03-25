import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAuthorSelectionComponent } from './library-author-selection.component';

describe('LibraryAuthorSelectionComponent', () => {
  let component: LibraryAuthorSelectionComponent;
  let fixture: ComponentFixture<LibraryAuthorSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAuthorSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
