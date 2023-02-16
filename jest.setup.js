import '@testing-library/jest-dom/extend-expect';

let mockFridge = {};

beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockFridge[key] = value;
  });
  global.Storage.prototype.getItem = jest.fn((key) => mockFridge[key]);
});

beforeEach(() => {
  mockFridge = {};
});

afterAll(() => {
  global.Storage.prototype.setItem.mockReset();
  global.Storage.prototype.getItem.mockReset();
});
