import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditionWrapperComponent } from './edition-wrapper.component';

describe('EditionWrapperComponent', () => {
  let component: EditionWrapperComponent;
  let fixture: ComponentFixture<EditionWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditionWrapperComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditionWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
