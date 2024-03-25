import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryAuthorInfoEditorComponent } from './library-author-info-editor.component';

describe('LibraryAuthorInfoEditorComponent', () => {
  let component: LibraryAuthorInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAuthorInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAuthorInfoEditorComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
