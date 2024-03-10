import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemCreateComponent } from './library-game-system-create.component';

describe('LibraryGameSystemCreateComponent', () => {
  let component: LibraryGameSystemCreateComponent;
  let fixture: ComponentFixture<LibraryGameSystemCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
