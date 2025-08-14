import { type Meta, type StoryObj } from '@storybook/react-vite';
import { within } from 'storybook/test';

import { Button, SidePane } from '@moneyforward/mfui-components';
import { useState } from 'react';
import { DefaultProductLayout } from '../components/DefaultProductLayout';
import { Form } from '.';
import styles from './styles.module.css';

const meta = {
  component: Form,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'This is a form template that can be used to create a form layout.',
      },
    },
  },
  decorators: [
    (Story) => (
      <DefaultProductLayout>
        <Story />
      </DefaultProductLayout>
    ),
  ],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

export const Center = {
  render: () => <Form />,
  decorators: [
    (Story) => (
      <div className={styles.container}>
        <div className={styles.pageContent}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form centered in the page',
      },
    },
  },
} satisfies Story;

export const Fill: Story = {
  render: () => <Form />,
  decorators: [
    (Story) => (
      <div className={styles.fillContainer}>
        <div className={styles.pageContent}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form fills the page',
      },
    },
  },
} satisfies Story;

export const InSidePane: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open SidePane
        </Button>
        <SidePane
          enableModal
          open={open}
          title="SidePane"
          targetDOMNode={document.querySelector('#story--templates-form--in-side-pane') as HTMLElement}
          onClose={() => {
            setOpen(false);
          }}
        >
          <Form />
        </SidePane>{' '}
      </>
    );
  },
  decorators: [
    (Story) => (
      <div className={styles.fillContainer}>
        <div className={styles.pageContent}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Form in a SidePane. Click the button to open the SidePane.',
      },
    },
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByText('Open SidePane');
    openButton.click();
  },
} satisfies Story;