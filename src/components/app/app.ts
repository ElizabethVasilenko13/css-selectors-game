import data from '../data/levels-data';
import LevelBoard from '../view/level/LevelBoard';
import Levels from '../view/levels/Levels';
import { LevelItem } from '../types/types';
import handleInput from '../util/css-input';
import { setLocalMemory } from '../util/local-memory';
import handleHelpBtn from '../util/help';
import handleHover from '../util/hover';

class App {
  private readonly levelPanel: Levels;

  constructor() {
    this.levelPanel = new Levels();
  }

  public start() {
    console.log(
      `Привет, для упрощения проверки на кросс-чек скажу что: \nСообщение о победе выводится только после прохождения всех уровней (в том числе с подсказкой)`
    );

    const levelId = localStorage.getItem('level-id') || '0';
    levelId && new LevelBoard(data[+levelId]).buildLevel();

    const levelsArray: LevelItem[] = JSON.parse(localStorage.getItem('levels-array') || '[]');
    this.levelPanel.drawLevelsPanel(levelsArray, data.length);
    handleInput();
    setLocalMemory();
    handleHelpBtn();
  }
}
export default App;
