import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconReceiptComponent } from './icon-receipt.component';

describe('IconMembersComponent', () => {
  let component: IconReceiptComponent;
  let fixture: ComponentFixture<IconReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconReceiptComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
