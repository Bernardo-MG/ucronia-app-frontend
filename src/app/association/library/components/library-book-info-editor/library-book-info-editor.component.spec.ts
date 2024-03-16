import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryBookInfoEditorComponent } from './library-book-info-editor.component';

describe('LibraryBookInfoEditorComponent', () => {
  let component: LibraryBookInfoEditorComponent;
  let fixture: ComponentFixture<LibraryBookInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryBookInfoEditorComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
