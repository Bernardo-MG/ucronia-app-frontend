import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryFrontpageComponent } from './library-frontpage.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LibraryFrontpageComponent', () => {
  let component: LibraryFrontpageComponent;
  let fixture: ComponentFixture<LibraryFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        LibraryFrontpageComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
