import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemEditFormComponent } from './library-game-system-edit-form.component';

describe('LibraryGameSystemEditFormComponent', () => {
  let component: LibraryGameSystemEditFormComponent;
  let fixture: ComponentFixture<LibraryGameSystemEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemEditFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
