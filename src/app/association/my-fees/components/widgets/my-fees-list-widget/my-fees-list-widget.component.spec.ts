import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFeesListWidgetComponent } from './my-fees-list-widget.component';

describe('MyFeesListWidgetComponent', () => {
  let component: MyFeesListWidgetComponent;
  let fixture: ComponentFixture<MyFeesListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MyFeesListWidgetComponent
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFeesListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
