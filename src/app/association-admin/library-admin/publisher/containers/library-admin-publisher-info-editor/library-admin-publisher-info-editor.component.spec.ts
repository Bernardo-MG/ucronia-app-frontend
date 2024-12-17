import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryAdminPublisherInfoEditorComponent } from './library-admin-publisher-info-editor.component';
import { PublisherAdminService } from '../../../services/publisher-admin.service';

describe('LibraryAdminPublisherInfoEditorComponent', () => {
  let component: LibraryAdminPublisherInfoEditorComponent;
  let fixture: ComponentFixture<LibraryAdminPublisherInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LibraryAdminPublisherInfoEditorComponent
      ],
      providers: [
        PublisherAdminService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminPublisherInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
