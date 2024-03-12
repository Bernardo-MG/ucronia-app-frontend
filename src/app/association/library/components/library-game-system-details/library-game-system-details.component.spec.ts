import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemDetailsComponent } from './library-game-system-details.component';

describe('LibraryGameSystemDetailsComponent', () => {
  let component: LibraryGameSystemDetailsComponent;
  let fixture: ComponentFixture<LibraryGameSystemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
