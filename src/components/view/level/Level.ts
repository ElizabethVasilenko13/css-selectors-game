import ElementCreator from '../../util/element-creator';

export default class Level {
  public tableBoard: HTMLElement | null;
  public HTMLViewerCode: HTMLElement | null;

  constructor() {
    this.tableBoard = null;
    this.HTMLViewerCode = null;
  }

  public buildGameField(boardContent: string, id: string, HTMLcontent: string) {
    this.tableBoard = new ElementCreator({ tagName: 'div', classNames: ['main-header'] }).getElement();
    this.HTMLViewerCode = new ElementCreator({ tagName: 'div', classNames: ['html-code'] }).getElement();
    this.setBoardContent(boardContent, id, HTMLcontent);
  }

  public setBoardContent(boardContent: string, id: string, HTMLcontent: string) {
    if (this.tableBoard) {
      this.tableBoard.innerHTML = boardContent;
      this.tableBoard?.setAttribute('data-id', id);
    }
    if (this.HTMLViewerCode) this.HTMLViewerCode.innerHTML = HTMLcontent;
  }
}
