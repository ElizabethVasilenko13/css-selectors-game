import { lewelsData } from '../types/types';

const data: lewelsData[] = [
  {
    id: '0',
    levelTitle: 'Select all flowers that have a roses category',
    levelAnswer: '[category="roses"]',
    levelCode: `<flower category="roses"></flower>
    <flower></flower>
    <flower category="tulips"></flower>`,
  },
  {
    id: '1',
    levelTitle: 'Select the first butterfly inside each flower',
    levelAnswer: 'flower butterfly:first-child',
    levelCode: `<flower>
    <butterfly></butterfly>
    <butterfly></butterfly>
    </flower>
    <lilypad></lilypad>
    <flower>
    <butterfly></butterfly>
    <butterfly></butterfly>
    </flower>`,
  },
  {
    id: '2',
    levelTitle: 'Select the small frog beside flowers',
    levelAnswer: 'flower ~ frog.small',
    levelCode: `<flower></flower>
    <frog class='small'></frog>
    <frog></frog>
    <flower></flower>`,
  },
  {
    id: '3',
    levelTitle: 'Select all frogs except the first one',
    levelAnswer: 'frog:not(:first-of-type)',
    levelCode: `<flower></flower>
    <lilypad>
    <butterfly></butterfly>
    </lilypad>
    <frog></frog>
    <frog></frog>
    <frog class="small"></frog>`,
  },
  {
    id: '4',
    levelTitle: 'Select the last flower that does not contain butterflies',
    levelAnswer: 'flower:not(:has(butterfly)):last-child',
    levelCode: `<flower>
    <butterfly></butterfly>
    </flower>
    <flower></flower>
    <flower>
    <butterfly></butterfly>
    </flower>
    <flower></flower>
    <flower></flower>
    `,
  },
  {
    id: '5',
    levelTitle: 'Select the small and bif frogs on lilypads',
    levelAnswer: 'lilypad > frog.big, lilypad > frog.small',
    levelCode: `<frog></frog>
    <lilypad>
    <frog></frog>
    </lilypad>
    <lilypad>
    <frog class='small'></frog>
    </lilypad>
    <lilypad>
    <frog class='big'></frog></lilypad>`,
  },
  {
    id: '6',
    levelTitle: 'Select all flowers starting with letter "a"',
    levelAnswer: 'flower[category^="a"]',
    levelCode: `<flower category="anemone"></flower>
    <flower category="aster"></flower>
    <flower category="lily"></flower>
    <flower category="rose"></flower>`,
  },
  {
    id: '7',
    levelTitle: 'Select the second flower',
    levelAnswer: 'flower:nth-of-type(2)',
    levelCode: ` <flower>
    <frog></frog>
    </flower>
    <flower>
      <frog></frog>
    </flower>
    <flower></flower>`,
  },
  {
    id: '8',
    levelTitle: 'Select all the lilypads except the firsr and last ones',
    levelAnswer: 'lilypad:not(:first-child):not(:last-child)',
    levelCode: `<lilypad id='fancy'></lilypad>
    <lilypad></lilypad>
    <lilypad>
    <frog></frog>
    </lilypad>
    <lilypad>
    <frog></frog>
    </lilypad>`,
  },
  {
    id: '9',
    levelTitle: 'Select every second lilypad does not contain anything',
    levelAnswer: 'lilypad:empty:nth-of-type(2n)',
    levelCode: `<lilypad></lilypad>
    <lilypad></lilypad>
    <lilypad></lilypad>
    <lilypad>
    <frog class="small"></frog>
    </lilypad>
    <lilypad>
    <frog></frog>
    </lilypad>`,
  },
];

export default data;
