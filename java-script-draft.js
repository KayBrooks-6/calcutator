// Math functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? 'Error: Divide by zero' : a / b;

function operate(firstValue, secondValue, operator) {
  switch (operator) {
    case 'add':
      return add(firstValue, secondValue);
    case 'subtract':
      return subtract(firstValue, secondValue);
    case 'multiply':
      return multiply(firstValue, secondValue);
    case 'divide':
      return divide(firstValue, secondValue);
    default:
      return 'Invalid operator';
  }
}

// DOM Elements
const display = document.querySelector('#display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('#clear');

// State variables
let currentInput = '';
let firstValue = null;
let secondValue = null;
let operator = null;
let resultDisplayed = false;

// Handle digit button click
digitButtons.forEach(button => {
  button.addEventListener('click', () => {
    const digit = button.textContent;

    // If result is displayed and user starts typing again
    if (resultDisplayed) {
      currentInput = '';
      resultDisplayed = false;
    }

    // Prevent leading 0s
    if (currentInput === '0') {
      currentInput = digit;
    } else {
      currentInput += digit;
    }

    display.textContent = currentInput;
  });
});

// Handle operator button click
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentInput === '') return;

    firstValue = Number(currentInput);
    currentInput = '';
    const opSymbol = button.textContent;

    // Map symbols to internal operator strings
    switch (opSymbol) {
      case '+':
        operator = 'add';
        break;
      case '-':
        operator = 'subtract';
        break;
      case 'x':
        operator = 'multiply';
        break;
      case '÷':
        operator = 'divide';
        break;
    }

    display.textContent = ''; // Optional: Clear display for second input
  });
});

// Handle equals button click
equalsButton.addEventListener('click', () => {
  if (currentInput === '' || firstValue === null || !operator) return;

  secondValue = Number(currentInput);
  const result = operate(firstValue, secondValue, operator);

  display.textContent = result;
  currentInput = result.toString();
  firstValue = null;
  secondValue = null;
  operator = null;
  resultDisplayed = true;
});

// Handle clear button
clearButton.addEventListener('click', () => {
  currentInput = '';
  firstValue = null;
  secondValue = null;
  operator = null;
  resultDisplayed = false;
  display.textContent = '0';
});
