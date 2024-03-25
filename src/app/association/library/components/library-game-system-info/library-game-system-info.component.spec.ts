import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemInfoComponent } from './library-game-system-info.component';

describe('LibraryGameSystemInfoComponent', () => {
  let component: LibraryGameSystemInfoComponent;
  let fixture: ComponentFixture<LibraryGameSystemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
