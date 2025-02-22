import "@testing-library/jest-dom";

// 🛠 Исправляем Request, Response, Headers для fetchBaseQuery
global.Request = global.Request || class {};
global.Response =
  global.Response ||
  class {
    clone() {
      return this;
    }
  };
global.Headers = global.Headers || class {};

// 🔍 Мок fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({}),
    })
  ) as jest.Mock;
});

afterAll(() => {
  jest.clearAllMocks();
});

// 🔍 Мок localStorage и sessionStorage
Object.defineProperty(global, "localStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(global, "sessionStorage", {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// 🔍 Мок ResizeObserver (используется в @hello-pangea/dnd)
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = global.ResizeObserver || ResizeObserverMock;

// 🔍 Исправленный мок IntersectionObserver
global.IntersectionObserver = class {
  root: Element | null = null;
  rootMargin: string = "";
  thresholds: number[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  callback: IntersectionObserverCallback;

  observe(target: Element) {
    this.callback(
      [
        {
          target,
          isIntersecting: true,
          time: Date.now(), // ✅ Добавляем обязательное свойство time
          boundingClientRect: target.getBoundingClientRect(), // ✅ Добавляем boundingClientRect
          intersectionRatio: 1, // ✅ Добавляем intersectionRatio
          intersectionRect: target.getBoundingClientRect(), // ✅ Добавляем intersectionRect
          rootBounds: null, // ✅ Добавляем rootBounds (может быть null)
        } as IntersectionObserverEntry,
      ],
      this
    );
  }

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};
