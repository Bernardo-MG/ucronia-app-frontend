import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherInfoEditorContainer } from './library-admin-publisher-edition.container';

describe('LibraryAdminPublisherInfoEditorContainer', () => {
  let component: LibraryAdminPublisherInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminPublisherInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminPublisherInfoEditorContainer
      ],
      providers: [
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminPublisherInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
