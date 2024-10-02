import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AssociationLayoutComponent } from './association-layout.component';

describe('AssociationLayoutComponent', () => {
  let component: AssociationLayoutComponent;
  let fixture: ComponentFixture<AssociationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AssociationLayoutComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
