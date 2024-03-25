import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryPublisherListComponent } from './library-publisher-list.component';

describe('LibraryPublisherListComponent', () => {
  let component: LibraryPublisherListComponent;
  let fixture: ComponentFixture<LibraryPublisherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryPublisherListComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryPublisherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
