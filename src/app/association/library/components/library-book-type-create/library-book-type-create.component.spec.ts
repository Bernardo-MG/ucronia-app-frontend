import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookTypeCreateComponent } from './library-book-type-create.component';
import { BookTypeService } from '../../services/book-type.service';

describe('LibraryBookTypeCreateComponent', () => {
  let component: LibraryBookTypeCreateComponent;
  let fixture: ComponentFixture<LibraryBookTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryBookTypeCreateComponent
      ],
      providers: [
        BookTypeService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
