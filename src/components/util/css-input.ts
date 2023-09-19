import Levels from '../view/levels/Levels';
import ElementCreator from './element-creator';
import { helpBtnHandler } from './help';
import { setLevelsCount } from './local-memory';
import data from '../data/levels-data';

const handleInput = () => {
  const input = document.querySelector<HTMLInputElement>('#css-input');
  addEnterBtnClickHandler();
  addEnterKeyboardPressHandler();
  setInputBlinking(input);
  handleInputField(input);
};

const setInputBlinking = (input: HTMLInputElement | null) => {
  input?.addEventListener('input', () => {
    input.classList.remove('blink');
    if (input.value.length === 0) {
      input.classList.add('blink');
    }
  });
};

// adjust input higlight
function handleInputField(input: HTMLInputElement | null) {
  const highlighter = document.getElementById('highlighter');

  input?.addEventListener('keydown', (e) => {
    if (e.code === 'Backspace') {
      input?.removeEventListener('input', inputHandler);
      const lastChild = highlighter?.lastElementChild;
      //remove last char after Backspace pressing
      if (lastChild) {
        highlighter.removeChild(lastChild);
      }
    } else {
      input?.addEventListener('input', inputHandler);
    }
  });
}

export function inputHandler() {
  const input = <HTMLInputElement>document.getElementById('css-input');
  const highlighter = document.getElementById('highlighter');
  if (highlighter) {
    const value = input.value;
    highlighter.innerHTML += highlight(value.slice(-1), value);
  }
}

export function highlight(selector: string, inputValue?: string) {
  let className = '';
  if (selector === '.') {
    className = 'green';
  } else if (selector === '#') {
    className = 'blue';
  } else if (selector === '[') {
    className = 'red';
  } else if ([':', '::'].includes(selector)) {
    className = 'purple';
  } else if (
    [',', ' ', '>', ':', '::', ';', '*'].includes(selector) ||
    (inputValue && inputValue[inputValue.length - 2] === ']')
  ) {
    className = 'black';
  } else {
    const b = document.getElementById('highlighter')?.querySelectorAll('span');
    b?.forEach((el) => {
      if (el.classList.length > 0) {
        className = el.className;
      }
    });
  }
  return `<span class="${className}">${selector}</span>`;
}

const addEnterBtnClickHandler = () => {
  document.querySelector('.enter-btn')?.addEventListener('click', handleAnswer);
};

const handleEnterKeyPress = (e: KeyboardEvent) => {
  if (e.code === 'Enter') {
    const answerInput = document.querySelector<HTMLInputElement>('#css-input');
    if (answerInput?.classList.contains('typing')) {
      document.getElementById('help-btn')?.removeEventListener('click', helpBtnHandler);
      window.removeEventListener('keydown', handleAnswer);
    } else {
      handleAnswer();
    }
  }
};

const addEnterKeyboardPressHandler = () => {
  window.addEventListener('keydown', handleEnterKeyPress);
};

function isValidSelector(selector: string) {
  try {
    document.querySelector('.table-surface')?.querySelectorAll(selector);
    return true;
  } catch (error) {
    return false;
  }
}

const handleAnswer = () => {
  const answerInput = document.querySelector<HTMLInputElement>('#css-input');
  const answerValue = answerInput?.value;
  const levelId = document.querySelector('.main-header')?.getAttribute('data-id');

  if (answerValue && isValidSelector(answerValue) && levelId) {
    const tableNodes = document.querySelector('.table-surface')?.querySelectorAll(`${answerValue}`);
    const tableNodesRight = document.querySelector('.table-surface')?.querySelectorAll(`${data[+levelId].levelAnswer}`);
    if (tableNodes?.length === tableNodesRight?.length && isAtcive(tableNodes) && tableNodes && tableNodes.length > 0) {
      handleRightAnswer(answerInput, answerValue);
    } else {
      handleWrongAnswer();
    }
  } else {
    handleWrongAnswer();
  }
};

const isAtcive = (tableNodes: NodeListOf<Element> | undefined) => {
  let conunt = 0;
  tableNodes?.forEach((el) => {
    if (el.classList.contains('active')) {
      conunt++;
    }
  });
  return conunt === tableNodes?.length;
};

const handleWrongAnswer = () => {
  const editor = document.querySelector('.editor');
  if (editor) {
    editor.classList.add('shake');
    editor.addEventListener('animationend', () => editor.classList.remove('shake'));
  }
};

export function clearInput() {
  document
    .getElementById('highlighter')
    ?.querySelectorAll('span')
    ?.forEach((el) => {
      el.remove();
    });
}

const handleRightAnswer = (inputElelent: HTMLInputElement, inputValue: string) => {
  if (inputValue) inputElelent.value = '';
  clearInput();

  const currentLevel = document.querySelector('.current');
  if (currentLevel && currentLevel.getAttribute('data-state') !== 'finished') {
    setLevelsCount();
  }

  //remove animation, invoke generateNewGameField after its ending
  const gameTable = document.querySelector('.table-surface');
  if (gameTable) {
    gameTable.classList.add('clean');
    gameTable.addEventListener('animationend', () => {
      gameTable.classList.remove('clean');
      inputElelent.classList.add('blink');
      generateNewGameField();
    });
  }
};

const generateNewGameField = () => {
  const levelID = document.querySelector('.main-header')?.getAttribute('data-id');
  const levelItems = document.querySelectorAll('.levels-item');

  if (levelID) {
    const idToNum = +levelID;
    //set fineshed state on the current level
    levelItems[idToNum].setAttribute('data-state', 'finished');

    //open new level or show win message
    const passedLevelCount = parseInt(localStorage.getItem('level-count') ?? '0');

    //calculate next level id( if its last level - reset to 0)
    let nextLevelId = 0;
    if (+levelID === levelItems.length - 1) {
      nextLevelId = 0;
    } else {
      nextLevelId = idToNum + 1;
    }

    //draw next level
    const nextLevelItem = levelItems[nextLevelId];
    new Levels().handleLevel(String(nextLevelId), nextLevelItem);

    //swow win state
    if (passedLevelCount === levelItems.length && localStorage.getItem('game-finished') !== 'true') {
      const gameTableSurface = document.querySelector('.table-surface');

      if (gameTableSurface) {
        gameTableSurface.innerHTML = '';
        clearInput();
        const winMessage = new ElementCreator({
          tagName: 'div',
          classNames: ['win'],
          textContent: 'You did it! You rock at CSS.',
        }).getElement();

        gameTableSurface.append(winMessage);
        localStorage.setItem('game-finished', 'true');
      }
    }
  }
};

export default handleInput;
