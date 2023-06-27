import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button, ButtonTheme } from './Button';

describe('Button', () => {
  test('Test render', () => {
    render(<Button>{'TEST'}</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('Test clear theme', () => {
    render(<Button theme={ButtonTheme.CLEAR}>{'TEST'}</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    const tree = renderer
      .create(<Button theme={ButtonTheme.CLEAR}>{'TEST'}</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
