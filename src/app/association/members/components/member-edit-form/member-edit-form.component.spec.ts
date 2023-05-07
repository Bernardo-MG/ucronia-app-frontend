import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditionModule } from '@app/shared/edition/edition.module';
import { MemberEditFormComponent } from './member-edit-form.component';

describe('MemberEditFormComponent', () => {
  let component: MemberEditFormComponent;
  let fixture: ComponentFixture<MemberEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditionModule
      ],
      declarations: [ 
        MemberEditFormComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
