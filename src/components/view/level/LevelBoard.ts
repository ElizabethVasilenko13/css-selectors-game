import { lewelsData } from '../../types/types';
import { clearInput } from '../../util/css-input';
import ElementCreator from '../../util/element-creator';
import { helpBtnHandler } from '../../util/help';
import handleHover from '../../util/hover';
import Level from './Level';
import hljs from 'highlight.js';

export default class LevelBoard extends Level {
  public id: string;
  public levelTitle: string;
  public levelAnswer: string;
  public levelCode: string;

  constructor(data: lewelsData) {
    super();
    this.id = data.id;
    this.levelTitle = data.levelTitle;
    this.levelAnswer = data.levelAnswer;
    this.levelCode = data.levelCode;
  }

  public buildLevel() {
    this.clearLevel();

    //draw editor code lines panel if it doesnt exist
    document.querySelectorAll('.editor-body').forEach((editorBody) => {
      const hasCodeLines = editorBody.querySelector('.code-lines') !== null;
      if (!hasCodeLines) {
        editorBody.prepend(this.createCodeLines());
      }
    });

    const template = `<h1>${this.levelTitle}</h1>
    <div class="table-wrapper">
          <div class="table-surface">
            <div class="lake">
              ${this.levelCode}
            </div>
          </div>
        </div>`;

    const htmpEditorCode = `<pre><code class="hljs language-xml">&lt;div class='lake'&gt;</pre></code>
    ${this.getHtmlTemplate()}
    <pre><code class="hljs language-xml">&lt;/div&gt;</pre></code>`;

    this.buildGameField(template, this.id, htmpEditorCode);

    this.HTMLViewerCode && document.querySelector('.html-body')?.append(this.HTMLViewerCode);
    this.tableBoard && document.querySelector('.main')?.prepend(this.tableBoard);

    //set active class on elements we need find
    document
      .querySelector('.lake')
      ?.querySelectorAll(this.levelAnswer)
      .forEach((el) => {
        el.classList.add('active');
      });

    document.getElementById('help-btn')?.addEventListener('click', helpBtnHandler);
    this.drawAttributeName();

    hljs.highlightAll();
    handleHover();
  }

  private drawAttributeName() {
    const childNodes = document.querySelector('.lake')?.childNodes;
    childNodes?.forEach((child) => {
      if (child.nodeType === 1) {
        const item = <HTMLElement>child;
        if (item.hasAttribute('category')) {
          const category = item.getAttribute('category');
          if (category) {
            const div = new ElementCreator({
              tagName: 'div',
              classNames: ['data'],
              textContent: category,
            }).getElement();

            item.append(div);
          }
        }
      }
    });
  }

  private createCodeLines(): HTMLElement {
    const codeLines = new ElementCreator({ tagName: 'div', classNames: ['code-lines'] }).getElement();

    const linesCounter = 15;
    for (let i = 0; i < linesCounter; i++) {
      codeLines?.append(document.createElement('div'));
    }

    return codeLines;
  }

  public clearLevel(): void {
    const answerInput = document.querySelector<HTMLInputElement>('#css-input');

    if (answerInput) {
      answerInput.value = '';
      clearInput();
      answerInput.classList.add('blink');
      answerInput.classList.remove('typing');
    }

    document.querySelector('.main-header')?.remove();
    document.querySelector('.html-code')?.remove();
  }

  private covertHTMLToTextFormat(str: string): string {
    return str
      .split('\n')
      .map((el) => el.trim().split('></'))
      .map((el) => {
        if (el.length > 1) {
          el = el.slice(0, 1);
          el[0] = el + '/>';
        }
        return el;
      })
      .join('\n')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  private generateHtmlTemplateWrappers(code: string) {
    const lines = code.split('\n');
    let result = '';

    function wrapTagsRecursive(tags: string[], isNested: boolean = false) {
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const trimmedTag = tag.trim();

        if (trimmedTag.startsWith('&lt;') && trimmedTag.endsWith('/&gt;')) {
          result += `<div><pre><code class="hljs language-xml">${trimmedTag}</pre></code></div>\n`;
        } else if (trimmedTag.startsWith('&lt;') && trimmedTag.endsWith('&gt;')) {
          if (isNested) {
            result += `${trimmedTag}\n`;
          } else {
            result += `<div><pre><code class="hljs language-xml">${trimmedTag}</pre></code>\n`;
            const innerTags = [];
            while (i + 1 < tags.length) {
              const nextTag = tags[i + 1];
              const nextTrimmedTag = nextTag.trim();
              if (nextTrimmedTag.startsWith('&lt;/')) {
                i++;
                break;
              }
              innerTags.push(nextTag);
              i++;
            }
            wrapTagsRecursive(innerTags, true);
            const closingTag = trimmedTag.replace('&lt;', '&lt;/').split(' ');
            const a = closingTag.length > 1 ? closingTag[0] + '&gt;' : closingTag[0];
            result += `<pre><code class="hljs language-xml">${a}</pre></code></div>\n`;
          }
        }
      }
    }
    wrapTagsRecursive(lines);
    return result.trim();
  }

  private getHtmlTemplate(): string {
    const editedHtmlCode = this.covertHTMLToTextFormat(this.levelCode);
    return this.generateHtmlTemplateWrappers(editedHtmlCode);
  }
}
