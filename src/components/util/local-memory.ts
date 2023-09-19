import { LevelItem } from '../types/types';

export function setLocalMemory() {
  const levelsItems = document.getElementsByClassName('levels-item');

  window.addEventListener('beforeunload', () => {
    setCurrentLevel();
    setLevelsState(levelsItems);
  });
}

export function setLevelsCount() {
  let finishedLevelsCount = parseInt(localStorage.getItem('level-count') ?? '0');
  finishedLevelsCount++;
  localStorage.setItem('level-count', String(finishedLevelsCount));
}

const setCurrentLevel = () => {
  const levelID = document.querySelector('.main-header')?.getAttribute('data-id');
  levelID && localStorage.setItem('level-id', levelID);
};

const setLevelsState = (levelsItems: HTMLCollectionOf<Element>) => {
  const levelsArray = [...levelsItems].reduce((arr: LevelItem[], element) => {
    if (element instanceof HTMLElement) {
      const { state, clue } = element.dataset;
      arr.push({
        state: state || '',
        clue: clue || '',
      });
    }
    return arr;
  }, []);
  localStorage.setItem('levels-array', JSON.stringify(levelsArray));
};

export default setLocalMemory;
