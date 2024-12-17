import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BookTypeAdminService } from '@app/association-admin/library-admin/services/book-type-admin.service';
import { LibraryAdminBookTypeCreateComponent } from './library-admin-book-type-creation.component';

describe('LibraryAdminBookTypeCreateComponent', () => {
  let component: LibraryAdminBookTypeCreateComponent;
  let fixture: ComponentFixture<LibraryAdminBookTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
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
