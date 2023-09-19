import data from '../data/levels-data';
import { clearInput, highlight } from './css-input';

const handleHelpBtn = () => {
  document.getElementById('help-btn')?.addEventListener('click', helpBtnHandler);
};

export function helpBtnHandler() {
  const currentLevel = document.querySelector('.current');
  const currentLevelId = currentLevel?.getAttribute('data-id');

  if (currentLevel && currentLevel.getAttribute('data-state') !== 'finished') {
    currentLevel.setAttribute('data-clue', 'true');
  }

  currentLevelId && typeAnswer(currentLevelId);
}

const typeAnswer = (currentLevelId: string) => {
  const answerInput = document.querySelector<HTMLInputElement>('#css-input');
  if (answerInput) answerInput.value = '';
  clearInput();

  answerInput?.classList.remove('blink');
  document.body.classList.add('block');
  answerInput?.classList.add('typing');
  const highlighter = document.getElementById('highlighter');
  const answer = data[+currentLevelId].levelAnswer;
  const typeWriter = createTypeWriter(answerInput, answer, highlighter);

  typeWriter();
};

const createTypeWriter = (answerInput: HTMLInputElement | null, answer: string, divElement: HTMLElement | null) => {
  let i = 0;
  const typeWriter = () => {
    if (i < answer.length) {
      if (answerInput && divElement) {
        answerInput.value += answer.charAt(i);
        divElement.innerHTML += highlight(answer.charAt(i), answerInput.value);
        setTimeout(() => {
          i++;
          typeWriter();
        }, 100);
      }
    } else {
      document.body.classList.remove('block');
      answerInput?.classList.remove('typing');
    }
  };
  return typeWriter;
};

export default handleHelpBtn;
