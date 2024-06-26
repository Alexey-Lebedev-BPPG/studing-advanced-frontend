import { getQueryParams } from './addQueryParams';

describe('shared/url/addQueryParams', () => {
  test('with one param', () => {
    const params = getQueryParams({ test: 'value' });
    expect(params).toBe('?test=value');
  });

  test('with multiple param', () => {
    const params = getQueryParams({ second: '2', test: 'value' });
    expect(params).toBe('?second=2&test=value');
  });

  test('with undefined', () => {
    const params = getQueryParams({ second: undefined, test: 'value' });
    expect(params).toBe('?test=value');
  });
});
