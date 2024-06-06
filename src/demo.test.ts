import {test, expect, describe, it} from 'vitest';

test('name',async () => {
  console.log('after 1s output name');
}, 1000);

const testNum = 2;
expect(testNum).toEqual(2);

// 11-14      16.30-21
// 11-13.30   16.30-21
// 11.30-14   17-21
