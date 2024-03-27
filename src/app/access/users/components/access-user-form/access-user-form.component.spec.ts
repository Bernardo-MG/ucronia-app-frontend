import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessUserFormComponent } from './access-user-form.component';

describe('AccessUserFormComponent', () => {
  let component: AccessUserFormComponent;
  let fixture: ComponentFixture<AccessUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LayoutModule,
        AccessUserFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
