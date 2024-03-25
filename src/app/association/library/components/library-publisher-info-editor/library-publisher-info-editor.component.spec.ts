import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryPublisherInfoEditorComponent } from './library-publisher-info-editor.component';
import { PublisherService } from '../../services/publisher.service';

describe('LibraryPublisherInfoEditorComponent', () => {
  let component: LibraryPublisherInfoEditorComponent;
  let fixture: ComponentFixture<LibraryPublisherInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryPublisherInfoEditorComponent
      ],
      providers: [
        PublisherService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryPublisherInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
