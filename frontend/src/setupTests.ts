import '@testing-library/jest-dom';

// Suppress ReactDOMTestUtils.act deprecation warning
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes?.('ReactDOMTestUtils.act is deprecated')) {
    return;
  }
  originalError.call(console, ...args);
};