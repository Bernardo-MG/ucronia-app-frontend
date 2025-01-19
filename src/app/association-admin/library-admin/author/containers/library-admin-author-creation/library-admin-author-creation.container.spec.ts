import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthorAdminService } from '../../services/author-admin.service';
import { LibraryAdminAuthorCreateContainer } from './library-admin-author-creation.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminAuthorCreateContainer', () => {
  let component: LibraryAdminAuthorCreateContainer;
  let fixture: ComponentFixture<LibraryAdminAuthorCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminAuthorCreateContainer],
    providers: [
        AuthorAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminAuthorCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
