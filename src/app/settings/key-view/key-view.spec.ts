import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Key } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { KeyService } from '../key-service';
import { KeyView } from './key-view';

describe('KeyView', () => {
  let component: KeyView;
  let fixture: ComponentFixture<KeyView>;

  const keyServiceMock = jasmine.createSpyObj<KeyService>(
    'KeyService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {
    keyServiceMock.getAll.and.returnValue(
      of(new Page<Key>())
    );

    await TestBed.configureTestingModule({
      imports: [KeyView],
      providers: [
        ConfirmationService,
        MessageService,
        provideAnimationsAsync(),
        { provide: KeyService, useValue: keyServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KeyView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
