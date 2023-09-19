export interface lewelsData {
  id: string;
  levelTitle: string;
  levelAnswer: string;
  levelCode: string;
}

export type DOMElementParametrs = {
  tagName: string;
  classNames: string[];
  textContent?: string;
};

export type LevelItem = {
  state: string;
  clue: string;
};
