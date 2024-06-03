import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Button } from './Button';

describe('Button', () => {
  test('render', () => {
    render(<Button>{'TEST'}</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
    const tree = renderer.create(<Button>{'TEST'}</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('clear theme', () => {
    render(<Button theme='clear'>{'TEST'}</Button>);
    expect(screen.getByText('TEST')).toHaveClass('button clear size-m');
    const tree = renderer
      .create(<Button theme='clear'>{'TEST'}</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
