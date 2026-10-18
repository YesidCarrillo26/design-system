import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './Skeleton.stories';

const { ListItem } = composeStories(stories);

describe('Skeleton (native)', () => {
  test('no se expone a los lectores de pantalla', async () => {
    await render(<ListItem />);

    expect(screen.queryByRole('img')).not.toBeOnTheScreen();
  });
});
