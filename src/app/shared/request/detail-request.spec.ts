import { createEnvironmentInjector, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { finalize, Subject } from 'rxjs';
import { DetailRequest } from './detail-request';

describe('DetailRequest', () => {
  let request: DetailRequest;
  let injector: EnvironmentInjector;

  beforeEach(() => {
    injector = createEnvironmentInjector([], TestBed.inject(EnvironmentInjector));
    request = runInInjectionContext(injector, () => new DetailRequest());
  });

  afterEach(() => {
    if (!injector.destroyed) injector.destroy();
  });

  it('ignores an older response after selecting another record', () => {
    const oldResponse = new Subject<string>();
    const newResponse = new Subject<string>();
    let selected = '';
    const oldSubscription = oldResponse.pipe(request.untilCancelled())
      .subscribe(value => selected = value);

    request.cancel();
    newResponse.pipe(request.untilCancelled())
      .subscribe(value => selected = value);
    newResponse.next('new');
    oldResponse.next('old');

    expect(oldSubscription.closed).toBeTrue();
    expect(selected).toBe('new');
    request.cancel();
  });

  it('cancels all related detail reads when the drawer closes or changes mode', () => {
    const response = new Subject<string>();
    const first = response.pipe(request.untilCancelled()).subscribe();
    const second = response.pipe(request.untilCancelled()).subscribe();
    request.cancel();
    expect(first.closed).toBeTrue();
    expect(second.closed).toBeTrue();
  });

  it('runs the old finalizer before the replacement starts loading', () => {
    const response = new Subject<string>();
    let loading = true;
    response.pipe(finalize(() => loading = false), request.untilCancelled()).subscribe();
    request.cancel();
    loading = true;
    response.next('late');
    expect(loading).toBeTrue();
  });

  it('cancels pending detail reads when its injection scope is destroyed', () => {
    const response = new Subject<string>();
    const subscription = response.pipe(request.untilCancelled()).subscribe();
    injector.destroy();
    expect(subscription.closed).toBeTrue();
  });
});
