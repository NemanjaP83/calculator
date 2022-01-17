// change color theme
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

// add event listener on buttons using pattern 'event delegation'
const keys = document.querySelector('.buttons');
const screen = document.querySelector('.screen__numbers');

keys.addEventListener('click', (e) => {
  let key = e.target.dataset.type;

  let char = e.target.textContent;
  let charOnDisplay = screen.textContent;

  // checking if button clicked
  if (!e.target.closest('button')) return;

  //  clear screen
  if (key === 'reset') {
    reset();
  }
  // displaying number
  if (key === 'number' || key === 'operator') {
    char = charOnDisplay === '' ? char : charOnDisplay + char;
    displayChar(char);
  }
  // operators
  if (key === 'equal') {
    // check if last char is operator and if it is remove it from string and display it
    if (
      charOnDisplay.slice(-1) === '+' ||
      charOnDisplay.slice(-1) === '-' ||
      charOnDisplay.slice(-1) === '*' ||
      charOnDisplay.slice(-1) === '/'
    ) {
      deleteNumber(charOnDisplay);
    } else if (charOnDisplay.charAt(0) === '0') {
      charOnDisplay = `Must use '.' after 0!`;
      displayChar(charOnDisplay);
    } else {
      displayChar(eval(charOnDisplay));
    }
  }
  //  delete number from screen
  if (key === 'del') {
    deleteNumber(charOnDisplay);
  }
});

// display char on screen
const displayChar = (char) => {
  screen.textContent = char;
};

// clear screen
const reset = () => {
  screen.textContent = '';
};

// delete last char from string
const deleteNumber = (charOnDisplay) => {
  screen.textContent = charOnDisplay.slice(0, -1);
};
