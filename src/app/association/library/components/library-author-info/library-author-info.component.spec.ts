import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAuthorInfoComponent } from './library-author-info.component';

describe('LibraryAuthorInfoComponent', () => {
  let component: LibraryAuthorInfoComponent;
  let fixture: ComponentFixture<LibraryAuthorInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAuthorInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
