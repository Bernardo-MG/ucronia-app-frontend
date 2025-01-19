import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookTypeAdminService } from '../../services/book-type-admin.service';
import { LibraryAdminBookTypeCreateContainer } from './library-admin-book-type-creation.container';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LibraryAdminBookTypeCreateContainer', () => {
  let component: LibraryAdminBookTypeCreateContainer;
  let fixture: ComponentFixture<LibraryAdminBookTypeCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        LibraryAdminBookTypeCreateContainer],
    providers: [
        BookTypeAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
})
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookTypeCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
