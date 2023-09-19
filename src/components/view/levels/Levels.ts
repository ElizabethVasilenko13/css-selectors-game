import { LevelItem } from '../../types/types';
import LevelBoard from '../level/LevelBoard';
import data from '../../data/levels-data';
import ElementCreator from '../../util/element-creator';

class Levels {
  public drawLevelsPanel(localStorageData: LevelItem[], levelsDataLen: number): void {
    const levelsWrappper = new ElementCreator({ tagName: 'div', classNames: ['levels'] }).getElement();
    let i = 0;

    while (i < levelsDataLen) {
      const levelItem = new ElementCreator({ tagName: 'div', classNames: ['levels-item'] }).getElement();
      const levelMarkIcon = new ElementCreator({ tagName: 'div', classNames: ['mark'] }).getElement();
      const levelNum = new ElementCreator({ tagName: 'div', classNames: ['level-num'] }).getElement();

      levelItem.setAttribute('data-id', String(i));

      // set data attributes according to local storage data
      if (localStorageData.length !== 0) {
        localStorageData[i].state === 'finished' && levelItem.setAttribute('data-state', 'finished');
        localStorageData[i].clue === 'true' && levelItem.setAttribute('data-clue', 'true');
      } else {
        levelItem.setAttribute('data-state', '');
        levelItem.setAttribute('data-clue', '');
      }

      levelNum.innerText = String(i + 1);

      // set current class to the level item if its equal to the open page id
      if (String(i) === document.querySelector('.main-header')?.getAttribute('data-id')) {
        levelItem.classList.add('current');
      }

      levelItem.append(levelMarkIcon, levelNum);
      levelsWrappper.append(levelItem);
      i++;
    }

    document.querySelector('aside')?.append(levelsWrappper);
    document.querySelector('.levels')?.addEventListener('click', this.levelsClickHandler);
    document.querySelector('.reset-btn')?.addEventListener('click', this.resetBtnHadler);
  }

  public levelsClickHandler = (e: Event): void => {
    const target = <HTMLElement>e.target;
    const levelItemBlock = target.closest('.levels-item');

    const id = levelItemBlock?.getAttribute('data-id');

    id && this.handleLevel(id, levelItemBlock);
  };

  public handleLevel(id: string, el: Element | null): void {
    document.querySelectorAll('.levels-item').forEach((item) => {
      item.classList.remove('current');
    });

    if (id) {
      el?.classList.add('current');
      const level = new LevelBoard(data[+id]);
      level.clearLevel();
      level.buildLevel();
    }
  }

  public resetBtnHadler(): void {
    localStorage.setItem('level-count', '0');
    localStorage.setItem('game-finished', 'false');

    document.querySelectorAll('.levels-item').forEach((item) => {
      item.removeAttribute('data-state');
      item.removeAttribute('data-clue');
    });
  }
}

export default Levels;
