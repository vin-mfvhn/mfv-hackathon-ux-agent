import { Typography } from '@moneyforward/mfui-components';
import { type FC } from 'react';
import { Card } from '../../../components/Card';
import { TextLink } from '../../../components/TextLink';
import styles from './styles.module.css';

type Item = {
  /**
   * The label of the item.
   */
  label: string;
  /**
   * The figure of the item (can be string for formatted values like $2.4M).
   */
  figure: string | number;
  /**
   * The URL to navigate to when the item is clicked.
   */
  to: string;
  /**
   * The color of the figure label.
   */
  themeColor?: string;
  /**
   * Optional description for the item.
   */
  description?: string;
};

type Props = {
  items: Item[];
  /**
   * Main title for the dashboard.
   */
  title?: string;
  /**
   * Subtitle for the dashboard.
   */
  subtitle?: string;
};

/**
 * The Department Reporting Dashboard page template.
 */
export const Template: FC<Props> = ({ 
  items, 
  title = 'Department Reporting Dashboard',
  subtitle 
}) => (
  <div className={styles.container}>
    {/* Page Header */}
    <div className={styles.pageHeader}>
      <Typography as="h1" variant="pageHeading1">
        {title}
      </Typography>
      {subtitle && (
        <Typography as="p" variant="body" className={styles.subtitle}>
          {subtitle}
        </Typography>
      )}
    </div>

    {/* Dashboard Cards Grid */}
    <div className={styles.base}>
      {items.map((item) => (
        <Card key={item.to}>
          <Card.Header>
            <div className={styles.header}>
              <Typography as="h2" variant="contentHeading">
                {item.label}
              </Typography>
              <TextLink to={item.to}>View Details</TextLink>
            </div>
          </Card.Header>
          <Card.Body>
            <div className={styles.cardContent}>
              <div className={styles.value} style={{ color: item.themeColor }}>
                {item.figure}
              </div>
              {item.description && (
                <Typography as="div" variant="controlLabel" className={styles.description}>
                  {item.description}
                </Typography>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  </div>
);
