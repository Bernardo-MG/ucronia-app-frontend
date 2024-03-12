import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemCreateFormComponent } from './library-game-system-create-form.component';

describe('LibraryGameSystemCreateFormComponent', () => {
  let component: LibraryGameSystemCreateFormComponent;
  let fixture: ComponentFixture<LibraryGameSystemCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
