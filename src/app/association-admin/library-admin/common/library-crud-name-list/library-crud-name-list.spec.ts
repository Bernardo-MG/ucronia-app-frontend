import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LibraryCrudNameList } from './library-crud-name-list';

describe('LibraryCrudNameList', () => {
  let component: LibraryCrudNameList;
  let fixture: ComponentFixture<LibraryCrudNameList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryCrudNameList
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryCrudNameList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
