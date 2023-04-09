import type { GetServerSidePropsContext } from 'next';
import { signOut } from 'next-auth/react';

import { getServerAuthSession } from '~/server/auth';

const TeamDashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-6 ">
        <h1 className="font-oswald text-5xl font-bold text-gray">
          These is beautiful heading
        </h1>
        <p className="font-medium">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          asperiores aliquam officia aspernatur quisquam similique dolores
          mollitia dicta quibusdam.
        </p>
      </div>
      <button
        className=" rounded-full bg-green-400 px-10 py-3 font-semibold text-white no-underline transition"
        onClick={() => void signOut()}
      >
        Sign out
      </button>
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (!session?.user.teamId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session: null },
  };
};

export default TeamDashboard;
