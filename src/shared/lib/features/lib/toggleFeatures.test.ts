import { toggleFeatures } from './toggleFeatures';

describe('ToggleFeatures', () => {
  test('off function', () => {
    expect(
      toggleFeatures({
        name: 'isAppRedesigned',
        off: () => 'off',
        on: () => 'on',
      }),
    ).toBe('off');
  });

  test('on function', () => {
    expect(
      toggleFeatures({
        name: 'isTest',
        off: () => 'off',
        on: () => 'on',
      }),
    ).toBe('on');
  });
});
