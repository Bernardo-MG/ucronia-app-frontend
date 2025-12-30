import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFeesView } from './my-fees-view';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MyFeesView', () => {
  let component: MyFeesView;
  let fixture: ComponentFixture<MyFeesView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MyFeesView],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFeesView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
