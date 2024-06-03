import { render, screen } from '@testing-library/react';
// import renderer from 'react-test-renderer';
import { Button } from './Button';

describe('Button', () => {
  test('render', () => {
    render(<Button>{'TEST'}</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // test('Test clear theme', () => {
  //   render(<Button variant='outline'>{'TEST'}</Button>);
  //   expect(screen.getByText('TEST')).toHaveClass('clear');
  //   const tree = renderer
  //     .create(<Button variant='clear'>{'TEST'}</Button>)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
