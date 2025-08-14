import { TextLink, Typography } from '@moneyforward/mfui-components';
import Link from 'next/link';
import { type FC } from 'react';
import { Card } from '../../../_components/Card';
import styles from './styles.module.css';

type Item = {
  /**
   * The label of the item.
   */
  label: string;
  /**
   * The figure of the item.
   */
  figure: number;
  /**
   * The URL to navigate to when the item is clicked.
   */
  href: string;
  /**
   * The color of the figure label.
   */
  themeColor?: string;
};

type Props = {
  items: Item[];
};

/**
 * The Dashboard page template.
 */
export const Template: FC<Props> = ({ items }) => (
  <div className={styles.base}>
    {items.map((item) => (
      <Card key={item.href}>
        <Card.Header>
          <div className={styles.header}>
            <Typography as="h2" variant="contentHeading">
              {item.label}
            </Typography>
            <TextLink href={item.href} customLinkComponent={Link}>
              More
            </TextLink>
          </div>
        </Card.Header>
        <Card.Body>
          <Typography as="div" variant="controlLabel">
            Total
          </Typography>
          <div className={styles.value} style={{ color: item.themeColor }}>
            {item.figure}
          </div>
        </Card.Body>
      </Card>
    ))}
  </div>
);
