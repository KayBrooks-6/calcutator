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




// 1) Get references
const display = document.getElementById('display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');

let firstValue = null;      // will hold the first number
let secondValue = null;     // will hold the second
let currentInput = '';      // the string the user is typing now
let currentOperator = null; // one of 'add','subtract','multiply','divide'

// 2) Typing digits appends to currentInput
digitButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // avoid leading zeros
    if (currentInput === '0') currentInput = btn.textContent;
    else currentInput += btn.textContent;
    display.textContent = currentInput;
  });
});

// 3) Clicking an operator
operatorButtons.forEach(btn => {
  const symbol = btn.textContent;
  // we’ll treat "=" differently from +-×÷
  if (symbol === '=') return;

  btn.addEventListener('click', () => {
    // 3a) If there’s already a pending operation, we might choose to compute it first...
    if (firstValue !== null && currentOperator !== null && currentInput !== '') {
      secondValue = parseFloat(currentInput);
      firstValue = operate(firstValue, secondValue, currentOperator);
      display.textContent = firstValue;
    } else {
      // 3b) First time: stash the number they just typed
      firstValue = parseFloat(currentInput);
    }

    // 3c) Figure out which operator they clicked
    switch (symbol) {
      case '+': currentOperator = 'add'; break;
      case '-': currentOperator = 'subtract'; break;
      case 'x': currentOperator = 'multiply'; break;
      case '÷': currentOperator = 'divide'; break;
    }

    // 3d) Reset so they can type the next number
    currentInput = '';
  });
});

// 4) Clicking “=”
operatorButtons.forEach(btn => {
  if (btn.textContent !== '=') return;
  btn.addEventListener('click', () => {
    if (currentOperator === null) return;         // nothing to do
    secondValue = parseFloat(currentInput);
    const result = operate(firstValue, secondValue, currentOperator);
    display.textContent = result;
    // Prepare for chaining: let this result be the new “firstValue”
    firstValue = (typeof result === 'number') ? result : null;
    currentOperator = null;
    currentInput = '';    // start fresh if they type again
  });
});

// 5) Clear resets everything
clearButton.addEventListener('click', () => {
  firstValue = null;
  secondValue = null;
  currentOperator = null;
  currentInput = '';
  display.textContent = '0';
});
