import { boardRouter } from '~/server/api/routers/board';
import { issueRouter } from '~/server/api/routers/issue';
import { tagRouter } from '~/server/api/routers/tag';
import { teamRouter } from '~/server/api/routers/team';
import { userRouter } from '~/server/api/routers/user';
import { createTRPCRouter } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  team: teamRouter,
  board: boardRouter,
  issue: issueRouter,
  tag: tagRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
