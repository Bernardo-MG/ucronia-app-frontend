import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameSystemListComponent } from './library-game-system-list.component';

describe('LibraryGameSystemListComponent', () => {
  let component: LibraryGameSystemListComponent;
  let fixture: ComponentFixture<LibraryGameSystemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameSystemListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryGameSystemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
