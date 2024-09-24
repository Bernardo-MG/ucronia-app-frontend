import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookTypeAdminService } from '@app/association/library-admin/services/book-type-admin.service';
import { LibraryAdminBookTypeCreateComponent } from './library-admin-book-type-create.component';

describe('LibraryAdminBookTypeCreateComponent', () => {
  let component: LibraryAdminBookTypeCreateComponent;
  let fixture: ComponentFixture<LibraryAdminBookTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LibraryAdminBookTypeCreateComponent
      ],
      providers: [
        BookTypeAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminBookTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
