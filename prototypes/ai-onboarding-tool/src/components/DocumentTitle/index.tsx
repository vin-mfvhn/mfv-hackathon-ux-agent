import { useEffect } from 'react';

type Props = Partial<{
  title: string;
  baseTitle: string;
}>;

/**
 * Sets the document title ( `<title>` element ).
 */
export const DocumentTitle = ({ title, baseTitle = 'Frontend Boilerplate' }: Props) => {
  useEffect(() => {
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [baseTitle, title]);

  return null;
};
