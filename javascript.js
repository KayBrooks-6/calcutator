const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Error: Divide by zero' : a / b;

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

const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');

let currentInput = '';

digitButtons.forEach(button => {
  button.addEventListener('click', () => {
    const digit = button.textContent;

    // Prevent leading 0s like 0001
    if (currentInput === '0') {
      currentInput = digit;
    } else {
      currentInput += digit;
    }

    display.textContent = currentInput;
  });
});

const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', () => {
   firstValue = null;
  secondValue = null;
  currentOperator = null;
  currentInput = '';
  display.textContent = '0';
});
