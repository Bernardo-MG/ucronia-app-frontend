import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookInfoComponent } from './library-book-info.component';

describe('LibraryBookInfoComponent', () => {
  let component: LibraryBookInfoComponent;
  let fixture: ComponentFixture<LibraryBookInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
