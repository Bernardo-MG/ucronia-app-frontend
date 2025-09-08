import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CrudNameList } from './crud-name-list';

describe('CrudNameList', () => {
  let component: CrudNameList;
  let fixture: ComponentFixture<CrudNameList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CrudNameList
      ],
      providers: [
        provideAnimationsAsync()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CrudNameList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
