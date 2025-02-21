import "@testing-library/jest-dom";

// Исправляем Request для fetchBaseQuery
global.Request = global.Request || class {};

// Мок fetch
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
