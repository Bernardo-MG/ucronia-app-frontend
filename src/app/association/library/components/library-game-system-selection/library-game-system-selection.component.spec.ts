import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemSelectionComponent } from './library-game-system-selection.component';

describe('LibraryGameSystemSelectionComponent', () => {
  let component: LibraryGameSystemSelectionComponent;
  let fixture: ComponentFixture<LibraryGameSystemSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
