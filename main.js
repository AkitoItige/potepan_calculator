let previousOperandTextElement = document.querySelector('[data-previous-operand]');
let currentOperandTextElement = document.querySelector('[data-current-operand]');

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');

let previousOperand = '';
let currentOperand = '';
let operation = '';

// 計算機の状態をクリアする
function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = '';
}

// 計算機に数字を追加する
function appendNumber(number) {
  // 既に小数点が含まれている場合は追加しない
  if (number === '.' && currentOperand.includes('.')) return;
  currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(selectedOperation) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    // 計算を実行する
    compute();
  }
  operation = selectedOperation;
  previousOperand = currentOperand;
  currentOperand = '';
}

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '÷':
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result;
  operation = '';
  previousOperand = '';
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;

  // 整数部分が NaN の場合は空文字列にする
  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    // 整数部分を桁区切りでフォーマットする
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
  }

  if (decimalDigits != null) {
    // 小数部分が存在する場合は整数部分と結合して返す
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
  if (operation != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandTextElement.innerText = '';
  }
}

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener('click', () => {
  clear();
  updateDisplay();
});