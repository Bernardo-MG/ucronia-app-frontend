import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAuthorFormComponent } from './library-author-form.component';

describe('LibraryAuthorFormComponent', () => {
  let component: LibraryAuthorFormComponent;
  let fixture: ComponentFixture<LibraryAuthorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAuthorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
