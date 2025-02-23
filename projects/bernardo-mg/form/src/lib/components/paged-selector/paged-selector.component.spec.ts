import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagedSelectorComponent } from '@bernardo-mg/form';

describe('PagedSelectorComponent', () => {
  let component: PagedSelectorComponent<any>;
  let fixture: ComponentFixture<PagedSelectorComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PagedSelectorComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
