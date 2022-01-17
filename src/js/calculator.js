const numbers = document.querySelectorAll('[data-type="number"]');
const operations = document.querySelectorAll('[data-type="operator"]');
const equalBtn = document.querySelector('[data-type="equal"]');
const delBtn = document.querySelector('[data-type="del"]');
const resetBtn = document.querySelector('[data-type="reset"]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const btnSwitch = document.getElementsByTagName('input');

Array.from(btnSwitch).forEach((e) => {
  e.addEventListener('change', () => {
    if (e.value === '1') {
      document.documentElement.setAttribute('data-theme', 'theme-1');
    } else if (e.value === '2') {
      document.documentElement.setAttribute('data-theme', 'theme-2');
    } else {
      document.documentElement.setAttribute('data-theme', 'theme-3');
    }
  });
});

class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.reset();
  }

  reset() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = '';
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice('', -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number;
  }

  calcOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation = null;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '/':
        computation = prev / current;
        break;
      case 'x':
        computation = prev * current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = '';
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
    if (this.operation !== null) {
      this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
    }
  }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

Array.from(numbers).forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.textContent);
    calculator.updateDisplay();
  });
});

Array.from(operations).forEach((operation) => {
  operation.addEventListener('click', () => {
    calculator.calcOperation(operation.textContent);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

resetBtn.addEventListener('click', () => {
  calculator.reset();
  calculator.updateDisplay();
});

delBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
