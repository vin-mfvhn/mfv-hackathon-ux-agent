import { type Metadata, type NextPage } from 'next';
import { getAllComments } from '../../_api/comment';
import { Template } from './_template';

/**
 * Comments page component.
 */
const Page: NextPage = async () => {
  const comments = await getAllComments();

  return <Template comments={comments} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export const metadata: Metadata = {
  title: 'Comments',
};
