import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryBookTypeInfoEditorComponent } from './library-book-type-info-editor.component';

describe('LibraryBookTypeInfoEditorComponent', () => {
  let component: LibraryBookTypeInfoEditorComponent;
  let fixture: ComponentFixture<LibraryBookTypeInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryBookTypeInfoEditorComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
