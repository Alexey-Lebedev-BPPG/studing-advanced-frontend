import { screen } from '@testing-library/react';
import { ToggleFeatures } from './ToggleFeatures';
import { componentRender } from '../../tests/componentRender/componentRender';

describe('ToggleFeatures', () => {
  test('off component', () => {
    componentRender(
      <ToggleFeatures
        nameFeatures={'isAppRedesigned'}
        off={<div>{'deprecated'}</div>}
        on={<div>{'redesigned'}</div>}
      />,
    );
    expect(screen.getByText('deprecated')).toBeInTheDocument();
  });

  test('on component', () => {
    componentRender(
      <ToggleFeatures
        nameFeatures={'isTest'}
        off={<div>{'deprecated'}</div>}
        on={<div>{'redesigned'}</div>}
      />,
    );
    expect(screen.getByText('redesigned')).toBeInTheDocument();
  });
});
