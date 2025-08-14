import { type Metadata, type NextPage } from 'next';
import { getAllUsers } from '../../_api/user';
import { Template } from './_template';

/**
 * Users page component.
 */
const Page: NextPage = async () => {
  const users = await getAllUsers();

  return <Template users={users} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export const metadata: Metadata = {
  title: 'Users',
};
