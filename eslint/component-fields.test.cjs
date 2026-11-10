const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Linter } = require('eslint');
const parser = require('@typescript-eslint/parser');
const rule = require('./component-fields.cjs');

const config = {
  files: ['**/*.ts'],
  languageOptions: { parser },
  plugins: { local: { rules: { fields: rule } } },
  rules: { 'local/fields': 'error' }
};

function lint(code) {
  return new Linter().verify(code, config, { filename: 'example.ts' });
}

test('groups mixed-visibility injections, Angular inputs, outputs and accessor pairs', () => {
  assert.deepEqual(lint(`
    import * as ng from '@angular/core';
    import { inject as dependency, model } from '@angular/core';

    @ng.Component({})
    class Editor {

      private readonly formBuilder = dependency(FormBuilder);
      public readonly router = ng.inject(Router);

      readonly active = model(false);
      @ng.Input()
      set loading(value: boolean) {
        this.pending = value;
      }
      get loading() { return this.pending; }
      readonly title = ng.input.required<string>();

      readonly saved = ng.output<void>();

      readonly form: Form;

      protected readonly heading = 'Heading';

      private pending = false;

      constructor(service: Service) {
        this.form = service.createForm();
      }

    }
  `), []);
});

test('reports ordering, accessor adjacency and spacing without offering fixes', () => {
  const messages = lint(`
    import { Component, inject, Input } from '@angular/core';

    @Component({})
    class Editor {
      readonly zebra = 1;
      readonly alpha = 2;
      private readonly service = inject(Service);
      get value() { return 1; }
      constructor() {}
      @Input() set value(value: number) {}
    }
  `);
  assert.ok(messages.every(message => message.ruleId === 'local/fields' && !message.fix));
  assert.ok(messages.some(message => message.messageId === 'order' && message.message.includes('"alpha"')));
  assert.ok(messages.some(message => message.messageId === 'order' && message.message.includes('injected dependencies')));
  assert.ok(messages.some(message => message.messageId === 'pair'));
  assert.ok(messages.some(message => message.messageId === 'spacing'));
});

test('flags readonly candidates while allowing Angular assignments and mutable references', () => {
  const messages = lint(`
    import { Component, Input, signal } from '@angular/core';

    @Component({})
    class Editor {

      @Input() initialValue = 0;

      count = signal(0);
      current = 0;
      readonly form = new Form();

      update() {
        this.count.set(1);
        ({ value: this.current } = { value: 1 });
      }

    }
  `);
  assert.deepEqual(messages.map(({ messageId, line }) => [messageId, line]), [['readonly', 9]]);
});

test('ignores ordinary classes, including decorators from other packages', () => {
  assert.deepEqual(lint(`
    import { Component } from './other';
    @Component({})
    class Ordinary { z = 0; a = 1; }
  `), []);
});

test('allows writes from Angular event handlers, two-way bindings and same-file consumers', () => {
  assert.deepEqual(lint(`
    import { Component } from '@angular/core';

    @Component({
      template: '<button (click)="pressed = true"></button><input [(ngModel)]="text">'
    })
    class Editor {

      pressed = false;
      text = '';
      value = 0;

    }

    new Editor().value = 1;
  `), []);
});
