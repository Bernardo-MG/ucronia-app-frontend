import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicLocationWidgetComponent } from './frontpage-location.component';

describe('PublicLocationWidgetComponent', () => {
  let component: PublicLocationWidgetComponent;
  let fixture: ComponentFixture<PublicLocationWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PublicLocationWidgetComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicLocationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
