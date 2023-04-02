import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteIconComponent } from './icon-delete.component';

describe('DeleteIconComponent', () => {
  let component: DeleteIconComponent;
  let fixture: ComponentFixture<DeleteIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        DeleteIconComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DeleteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
