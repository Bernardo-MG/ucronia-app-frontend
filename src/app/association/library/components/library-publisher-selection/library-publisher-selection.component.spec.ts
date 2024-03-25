import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPublisherSelectionComponent } from './library-publisher-selection.component';

describe('LibraryPublisherSelectionComponent', () => {
  let component: LibraryPublisherSelectionComponent;
  let fixture: ComponentFixture<LibraryPublisherSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPublisherSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryPublisherSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
