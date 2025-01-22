import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditIconComponent } from './icon-edit.component';

describe('EditIconComponent', () => {
  let component: EditIconComponent;
  let fixture: ComponentFixture<EditIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        EditIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
