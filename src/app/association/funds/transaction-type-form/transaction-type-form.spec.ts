import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { UcroniaClient } from '@ucronia/api';
import { MessageService } from 'primeng/api';
import { of, Subject, throwError } from 'rxjs';
import { TransactionTypeForm } from './transaction-type-form';

describe('TransactionTypeForm', () => {
  const created = { number: 1, description: 'Donación', color: '#123456' };

  let component: TransactionTypeForm;
  let create: jasmine.Spy;
  let update: jasmine.Spy;
  let notify: jasmine.Spy;
  let closed: jasmine.Spy;

  beforeEach(() => {
    create = jasmine.createSpy('create');
    update = jasmine.createSpy('update');
    notify = jasmine.createSpy('add');
    TestBed.configureTestingModule({
      imports: [TransactionTypeForm],
      providers: [
        provideZonelessChangeDetection(),
        provideNoopAnimations(),
        { provide: UcroniaClient, useValue: { transactionType: { create, update } } },
        { provide: MessageService, useValue: { add: notify } }
      ]
    });
    const fixture = TestBed.createComponent(TransactionTypeForm);
    component = fixture.componentInstance;
    closed = spyOn(component.closed, 'emit');
    fixture.detectChanges();
  });

  for (const [label, description, color] of [
    ['empty description', '', '#123456'],
    ['blank description', '   ', '#123456'],
    ['overlong description', 'a'.repeat(201), '#123456'],
    ['invalid color', 'Donación', '#123']
  ]) {
    it(`rejects ${label}`, () => {
      component.form.setValue({ description, color });
      component.save();

      expect(component.form.invalid).toBeTrue();
      expect(create).not.toHaveBeenCalled();
    });
  }

  it('submits trimmed values once and closes after success', () => {
    const response = new Subject<typeof created>();
    create.and.returnValue(response);
    component.form.setValue({ description: ' Donación ', color: '#123456' });

    component.save();
    component.save();

    expect(create).toHaveBeenCalledOnceWith({ description: 'Donación', color: '#123456' });
    expect(component.saving).toBeTrue();
    expect(closed).not.toHaveBeenCalled();

    response.next(created);
    response.complete();

    expect(component.saving).toBeFalse();
    expect(notify).toHaveBeenCalledOnceWith(jasmine.objectContaining({ severity: 'info' }));
    expect(closed).toHaveBeenCalledTimes(1);
  });

  it('retains the entered values after failure and allows retry', () => {
    const values = { description: 'Donación', color: '#123456' };
    component.form.setValue(values);
    create.and.returnValue(throwError(() => new Error('Request failed')));

    component.save();

    expect(component.failed).toBeTrue();
    expect(component.saving).toBeFalse();
    expect(component.form.getRawValue()).toEqual(values);
    expect(notify).not.toHaveBeenCalled();
    expect(closed).not.toHaveBeenCalled();

    create.and.returnValue(of(created));
    component.save();

    expect(create).toHaveBeenCalledTimes(2);
    expect(component.failed).toBeFalse();
    expect(closed).toHaveBeenCalledTimes(1);
  });
  it('prefills the edit form and updates the selected type', () => {
    const fixture = TestBed.createComponent(TransactionTypeForm);
    fixture.componentRef.setInput('data', created);
    fixture.detectChanges();
    const form = fixture.componentInstance;
    const updated = spyOn(form.updated, 'emit');
    const saved = { ...created, description: 'Cuota' };
    update.and.returnValue(of(saved));

    expect(form.form.getRawValue()).toEqual({ description: created.description, color: created.color });
    form.form.controls.description.setValue(' Cuota ');
    form.save();

    expect(update).toHaveBeenCalledOnceWith(created.number, { description: 'Cuota', color: created.color });
    expect(updated).toHaveBeenCalledOnceWith(saved);
    expect(create).not.toHaveBeenCalled();
  });

});
