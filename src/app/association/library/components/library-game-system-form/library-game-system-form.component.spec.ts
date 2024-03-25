import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemFormComponent } from './library-game-system-form.component';

describe('LibraryGameSystemFormComponent', () => {
  let component: LibraryGameSystemFormComponent;
  let fixture: ComponentFixture<LibraryGameSystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
