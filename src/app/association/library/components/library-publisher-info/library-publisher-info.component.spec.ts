import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryPublisherInfoComponent } from './library-publisher-info.component';

describe('LibraryPublisherInfoComponent', () => {
  let component: LibraryPublisherInfoComponent;
  let fixture: ComponentFixture<LibraryPublisherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPublisherInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryPublisherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
