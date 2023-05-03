import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditionModule } from '@app/shared/edition/edition.module';
import { MemberFormComponent } from './member-form.component';

describe('MemberFormComponent', () => {
  let component: MemberFormComponent;
  let fixture: ComponentFixture<MemberFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditionModule
      ],
      declarations: [ 
        MemberFormComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
