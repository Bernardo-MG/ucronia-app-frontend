import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryBookTypeListComponent } from './library-book-type-list.component';

describe('LibraryBookTypeListComponent', () => {
  let component: LibraryBookTypeListComponent;
  let fixture: ComponentFixture<LibraryBookTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryBookTypeListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
