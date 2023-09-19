import ElementCreator from './element-creator';

export default function handleHover(): void {
  const htmlCode = document.querySelector('.html-code');
  const htmlCodeInner = htmlCode?.querySelectorAll('div');
  const lakeElement = document.querySelector('.lake');
  const allLakeElements = lakeElement?.querySelectorAll('*:not(div)');

  //set hover on html code example
  htmlCodeInner?.forEach((el, i) => {
    el.addEventListener('mouseover', (e) => {
      handleMouseOver(el, i, allLakeElements, 'hover', 'element-hover');
      e.stopPropagation();
    });

    el.addEventListener('mouseleave', () => {
      handleMouseLeave(el, i, allLakeElements);
    });
  });

  //set hover on gameBoard items
  allLakeElements?.forEach((el, i) => {
    el.addEventListener('mouseover', (e) => {
      handleMouseOver(el, i, allLakeElements, 'element-hover', 'hover', htmlCodeInner);
      e.stopPropagation();
    });

    el.addEventListener('mouseleave', () => {
      handleMouseLeave(el, i, allLakeElements, htmlCodeInner);
    });
  });
}

function handleMouseOver(
  item: Element,
  index: number,
  allLakeElements: NodeListOf<Element> | undefined,
  currentElClass: string,
  currentPageClass: string,
  htmlCodeInner?: NodeListOf<Element> | undefined
): void {
  item.parentElement?.classList.remove(currentElClass);
  item.classList.add(currentElClass);

  if (allLakeElements) {
    const currentGameBoardItem = <HTMLElement>allLakeElements[index];

    // check if its hover on gameBoard or codeExample
    if (htmlCodeInner) {
      const currentHtmlCodeInner = htmlCodeInner[index];
      currentHtmlCodeInner.classList.add('hover');
      currentHtmlCodeInner.parentElement?.classList.remove('hover');
    } else {
      currentGameBoardItem.classList.add(currentPageClass);
      currentGameBoardItem.parentElement?.classList.remove(currentPageClass);
    }

    removeAllElements(<Element>currentGameBoardItem.parentElement);

    // create div with html code of current element
    const div = new ElementCreator({
      tagName: 'div',
      classNames: ['element'],
      textContent: generateTagName(currentGameBoardItem),
    }).getElement();

    currentGameBoardItem.append(div);
  }
}

function handleMouseLeave(
  item: Element,
  index: number,
  allLakeElements: NodeListOf<Element> | undefined,
  htmlCodeInner?: NodeListOf<Element> | undefined
): void {
  item.classList.remove('hover');
  if (allLakeElements) {
    const currentGameBoardItem = <HTMLElement>allLakeElements[index];

    if (htmlCodeInner) htmlCodeInner[index].classList.remove('hover');
    currentGameBoardItem.classList.remove('element-hover');
    removeAllElements(currentGameBoardItem);
  }
}

function removeAllElements(item: Element): void {
  item.querySelectorAll('.element')?.forEach((el) => {
    el.remove();
  });
}

function generateTagName(currentGameBoardItem: HTMLElement): string {
  const tagName = currentGameBoardItem.tagName.toLowerCase();
  const className = currentGameBoardItem.className.split(' ')[0];
  const dataAttr = currentGameBoardItem.getAttribute('category');
  const elDataAttr = dataAttr ? ` category="${dataAttr}` : '';
  const id = currentGameBoardItem.id ? ` id="${currentGameBoardItem.id}"` : '';
  const clas = ['big', 'small'].includes(className) ? ` class="${className}"` : '';

  return `<${tagName}${id}${clas}${elDataAttr}> \n<${tagName}/>`;
}
