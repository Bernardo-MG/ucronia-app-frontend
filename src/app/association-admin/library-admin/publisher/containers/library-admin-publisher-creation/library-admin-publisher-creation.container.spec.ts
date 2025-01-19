import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PublisherAdminService } from '../../services/publisher-admin.service';
import { LibraryAdminPublisherCreateContainer } from './library-admin-publisher-creation.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminPublisherCreateContainer', () => {
  let component: LibraryAdminPublisherCreateContainer;
  let fixture: ComponentFixture<LibraryAdminPublisherCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminPublisherCreateContainer],
    providers: [
        PublisherAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminPublisherCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
