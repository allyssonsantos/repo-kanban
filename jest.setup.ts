import '@testing-library/jest-dom/extend-expect';

let mockFridge: Record<string, any> = {};

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockFridge[key as keyof typeof mockFridge] = value;
  });
  global.Storage.prototype.getItem = jest.fn((key) => mockFridge[key]);
});

beforeEach(() => {
  mockFridge = {};
});

afterAll(() => {
  (global.Storage.prototype.setItem as jest.Mock).mockReset();
  (global.Storage.prototype.getItem as jest.Mock).mockReset();
});
