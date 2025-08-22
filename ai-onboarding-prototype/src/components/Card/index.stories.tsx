import { type Meta, type StoryObj } from '@storybook/react';
import { Card } from '.';

export default {
  component: Card,
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h1>Card Demo</h1>
      </Card.Header>

      <Card.Body>
        <p>
          Hello world! This is a sample text for demonstration purposes. The Card component is a versatile container
          that can hold various types of content. It is designed to be flexible and easy to use, making it a great
          choice for displaying information in a structured and visually appealing way.
        </p>

        <p>
          Goodbye world! This is another sample text to show how multiple paragraphs can be displayed within the Card
          component. You can use the Card component to organize your content and make it more readable and engaging for
          your users.
        </p>
      </Card.Body>
    </Card>
  ),
};
