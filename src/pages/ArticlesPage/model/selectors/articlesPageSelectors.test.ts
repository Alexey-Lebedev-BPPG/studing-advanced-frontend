import {
  getArticlesPageError,
  getArticlesPageHasMore,
  getArticlesPageInited,
  getArticlesPageIsLoading,
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from './articlesPageSelectors';
import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleView } from '@/entities/Article';

describe('getAddCommentForm', () => {
  test('should return data', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { isLoading: true },
    };
    expect(getArticlesPageIsLoading(state as StateSchema)).toBe(true);
  });

  test('should return loading', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { isLoading: false },
    };
    expect(getArticlesPageIsLoading(state as StateSchema)).toBe(false);
  });

  test('should return undefined', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageIsLoading(state as StateSchema)).toBeUndefined();
  });

  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { error: 'error' },
    };
    expect(getArticlesPageError(state as StateSchema)).toBe('error');
  });

  test('should return no error', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { error: '' },
    };
    expect(getArticlesPageError(state as StateSchema)).toBe('');
  });

  test('should return undefined for page', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageError(state as StateSchema)).toBeUndefined();
  });

  test('should return data view', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { view: 'BIG' as ArticleView },
    };
    expect(getArticlesPageView(state as StateSchema)).toBe('BIG');
  });

  test('should return data when view is BIG', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { view: 'SMALL' as ArticleView },
    };
    expect(getArticlesPageView(state as StateSchema)).toBe('SMALL');
  });

  test('should return undefined for view', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageView(state as StateSchema)).toBe('SMALL');
  });

  test('should return data for page', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { page: 2 },
    };
    expect(getArticlesPageNum(state as StateSchema)).toBe(2);
  });

  test('should return undefined for page num', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageNum(state as StateSchema)).toBe(1);
  });

  test('should return data for limit', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { limit: 2 },
    };
    expect(getArticlesPageLimit(state as StateSchema)).toBe(2);
  });

  test('should return undefined for limit', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageLimit(state as StateSchema)).toBe(9);
  });

  test('should return data for hasMore', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { hasMore: true },
    };
    expect(getArticlesPageHasMore(state as StateSchema)).toBe(true);
  });

  test('should return data for haseMore', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { hasMore: false },
    };
    expect(getArticlesPageHasMore(state as StateSchema)).toBe(false);
  });

  test('should return undefined for hasMore', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageHasMore(state as StateSchema)).toBeUndefined();
  });

  test('should return data inited true', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { _inited: true },
    };
    expect(getArticlesPageInited(state as StateSchema)).toBe(true);
  });

  test('should return data for inited false', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { _inited: false },
    };
    expect(getArticlesPageInited(state as StateSchema)).toBe(false);
  });

  test('should return undefined for inited', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageInited(state as StateSchema)).toBeUndefined();
  });

  test('should return data for order asc', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { order: 'asc' },
    };
    expect(getArticlesPageOrder(state as StateSchema)).toBe('asc');
  });

  test('should return data for order desc', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { order: 'desc' },
    };
    expect(getArticlesPageOrder(state as StateSchema)).toBe('desc');
  });

  test('should return undefined for order', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageOrder(state as StateSchema)).toBe('asc');
  });

  test('should return data for sort title', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { sort: 'title' },
    };
    expect(getArticlesPageSort(state as StateSchema)).toBe('title');
  });

  test('should return data for sort createdAt', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { sort: 'createdAt' },
    };
    expect(getArticlesPageSort(state as StateSchema)).toBe('createdAt');
  });

  test('should return data for sort views', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { sort: 'views' },
    };
    expect(getArticlesPageSort(state as StateSchema)).toBe('views');
  });

  test('should return undefined for sort', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageSort(state as StateSchema)).toBe('createdAt');
  });

  test('should return data search test', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { search: 'test' },
    };
    expect(getArticlesPageSearch(state as StateSchema)).toBe('test');
  });

  test('should return undefined for search', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageSearch(state as StateSchema)).toBe('');
  });

  test('should return data for type ALL', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { type: 'ALL' },
    };
    expect(getArticlesPageType(state as StateSchema)).toBe('ALL');
  });

  test('should return data for type ECONOMICS', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { type: 'ECONOMICS' },
    };
    expect(getArticlesPageType(state as StateSchema)).toBe('ECONOMICS');
  });

  test('should return data for type IT', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { type: 'IT' },
    };
    expect(getArticlesPageType(state as StateSchema)).toBe('IT');
  });

  test('should return data for type SCIENCE', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: { type: 'SCIENCE' },
    };
    expect(getArticlesPageType(state as StateSchema)).toBe('SCIENCE');
  });

  test('should return undefined for type', () => {
    const state: DeepPartial<StateSchema> = {};
    expect(getArticlesPageType(state as StateSchema)).toBe('ALL');
  });
});
