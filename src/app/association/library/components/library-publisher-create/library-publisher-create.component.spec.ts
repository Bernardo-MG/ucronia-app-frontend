import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryPublisherCreateComponent } from './library-publisher-create.component';

describe('LibraryPublisherCreateComponent', () => {
  let component: LibraryPublisherCreateComponent;
  let fixture: ComponentFixture<LibraryPublisherCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryPublisherCreateComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryPublisherCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
