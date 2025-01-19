import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherInfoEditorContainer } from './library-admin-publisher-edition.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminPublisherInfoEditorContainer', () => {
  let component: LibraryAdminPublisherInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminPublisherInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminPublisherInfoEditorContainer],
    providers: [
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
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
