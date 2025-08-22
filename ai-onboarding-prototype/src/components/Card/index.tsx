import { type CSSProperties, type ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
} & Pick<CSSProperties, 'height' | 'maxHeight' | 'width' | 'maxWidth'>;

/**
 * A card is a container UI that displays content or actions related to a single topic.
 *
 * @remarks
 *
 * If you want to display the content inside the Card with scrolling, specify height or maxHeight.
 * This sets the overall height of the Card, and if the content exceeds that height, the content inside Card.Body will be scrollable.
 *
 * @example
 *
 * ```typescript
 * <Card>
 *   <Card.Header>
 *     <h1>Title</h1>
 *   <Card.Header>
 *
 *   <Card.Body>
 *     <p>hello world!</p>
 *     <p>Goodbye world!</p>
 *   </Card.Body>
 * </Card>
 * ```
 */
export const Card = ({ children, height, maxHeight, width, maxWidth }: Props) => (
  <div className={styles.base} style={{ height, maxHeight, width, maxWidth }}>
    {children}
  </div>
);

type HeaderProps = {
  children: ReactNode;
};

/**
 * Header component for Card.
 *
 * @example
 * ```
 * <Card>
 *   <Card.Header>
 *     <h1 className={styleTitle}>Title</h1>
 *   </Card.Header>
 *   ...
 * </Card>
 * ```
 */
Card.Header = ({ children }: HeaderProps) => <header className={styles.header}>{children}</header>;

type BodyProps = {
  children: ReactNode;
};

/**
 * Body component for Card.
 *
 * @example
 * ```
 * <Card>
 *   ...
 *   <Card.Body>
 *     <p>hello world!</p>
 *     <p>Goodbye world!</p>
 *   </Card.Body>
 *   ...
 * </Card>
 * ```
 */
Card.Body = ({ children }: BodyProps) => <div className={styles.body}>{children}</div>;
