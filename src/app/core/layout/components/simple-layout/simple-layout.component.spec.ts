import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SimpleLayoutComponent } from './simple-layout.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SimpleLayoutComponent', () => {
  let component: SimpleLayoutComponent;
  let fixture: ComponentFixture<SimpleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [RouterTestingModule,
        SimpleLayoutComponent],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
      .compileComponents();

    fixture = TestBed.createComponent(SimpleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
