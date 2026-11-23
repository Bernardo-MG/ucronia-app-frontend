import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.restoreAllMocks();
});

// jsdom has no layout engine. Optimus UI uses these APIs when rendering overlays and tables.
window.matchMedia ??= (media: string): MediaQueryList => Object.assign(new EventTarget(), {
  matches: false,
  media,
  onchange: null,
  addListener: () => {},
  removeListener: () => {}
});

globalThis.ResizeObserver ??= class implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
};
