import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPublisherFormComponent } from './library-publisher-form.component';

describe('LibraryPublisherFormComponent', () => {
  let component: LibraryPublisherFormComponent;
  let fixture: ComponentFixture<LibraryPublisherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPublisherFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryPublisherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
