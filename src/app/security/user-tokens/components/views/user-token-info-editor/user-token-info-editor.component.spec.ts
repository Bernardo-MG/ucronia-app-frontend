import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroupDirective, NgControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserTokenInfoEditorComponent } from './user-token-info-editor.component';

describe('UserTokenInfoEditorComponent', () => {
  let component: UserTokenInfoEditorComponent;
  let fixture: ComponentFixture<UserTokenInfoEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        UserTokenInfoEditorComponent
      ],
      providers: [
        { provide: FormGroupDirective, useValue: { form: { get: () => null } } },
        { provide: NgControl, useValue: { control: new FormControl() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTokenInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
