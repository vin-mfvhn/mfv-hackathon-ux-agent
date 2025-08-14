import { Typography } from '@moneyforward/mfui-components';
import { type FC } from 'react';
import { Card } from '../../../components/Card';
import { TextLink } from '../../../components/TextLink';
import { Paths } from '../../../routes';
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
  to: string;
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
      <Card key={item.to}>
        <Card.Header>
          <div className={styles.header}>
            <Typography as="h2" variant="contentHeading">
              {item.label}
            </Typography>
            <TextLink to={Paths.Users.Index}>More</TextLink>
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
