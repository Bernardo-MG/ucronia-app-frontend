import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookReturnComponent } from './library-book-return.component';

describe('LibraryBookReturnComponent', () => {
  let component: LibraryBookReturnComponent;
  let fixture: ComponentFixture<LibraryBookReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryBookReturnComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
