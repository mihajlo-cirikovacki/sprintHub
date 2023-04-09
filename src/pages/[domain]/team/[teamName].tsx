import type { GetServerSidePropsContext } from 'next';
import { signOut } from 'next-auth/react';

import { getServerAuthSession } from '~/server/auth';

const Team = () => {
  return (
    <>
      <h1>TEAM PAGE</h1>
      <button
        className="rounded-full bg-green-400 px-10 py-3 font-semibold text-white no-underline transition"
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

export default Team;
