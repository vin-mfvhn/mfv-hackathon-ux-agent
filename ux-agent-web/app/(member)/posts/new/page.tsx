import { type Metadata, type NextPage } from 'next';
import { Template } from './_template';

/**
 * New post page component.
 */
const Page: NextPage = () => <Template />;

export default Page;

/**
 * Sets the title of the page.
 */
export const metadata: Metadata = {
  title: 'New Post',
};
