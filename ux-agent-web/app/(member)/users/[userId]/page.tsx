import { type NextPage } from 'next';
import { getUserById } from '../../../_api/user';
import { Template } from './_template';

type Props = {
  params: Promise<{ userId: string }>;
};

/**
 * User page component.
 */
const Page: NextPage<Props> = async ({ params }) => {
  const { userId } = await params;

  const user = await getUserById(Number(userId));

  return <Template user={user} />;
};

export default Page;

/**
 * Sets the title of the page.
 */
export async function generateMetadata({ params }: Props) {
  const { userId } = await params;

  const user = await getUserById(Number(userId));

  return {
    title: user.name,
  };
}
