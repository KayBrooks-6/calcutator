const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const multiply = function(a, b) {
  return a * b;
};

const divide = function(a, b) {
  if (b === 0) return 'Error: Divide by zero';
  return a / b;
};

const factorial = function(n) {
  let product = 1;
  while (n > 1) {
    product *= n;
    n--;
  }
  return product;
};

function operate(firstValue, secondValue, operator) {
  if (operator === 'add') {
    return add(firstValue, secondValue);
  } else if (operator === 'subtract') {
    return subtract(firstValue, secondValue);
  } else if (operator === 'multiply') {
    return multiply(firstValue, secondValue);
  } else if (operator === 'divide') {
    return divide(firstValue, secondValue);
  } else {
    return 'Invalid operator';
  }
};

let firstValue = null;
let secondValue = null;
let operator = null;

let result = operate(firstValue, secondValue, operator);
console.log(result);

