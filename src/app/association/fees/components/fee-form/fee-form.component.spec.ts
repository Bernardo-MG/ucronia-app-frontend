import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditionModule } from '@app/shared/edition/edition.module';
import { FeeFormComponent } from './fee-form.component';

describe('FeeFormComponent', () => {
  let component: FeeFormComponent;
  let fixture: ComponentFixture<FeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditionModule
      ],
      declarations: [
         FeeFormComponent 
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
