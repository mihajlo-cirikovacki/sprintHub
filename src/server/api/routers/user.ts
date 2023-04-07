import { UserRole } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export const userRouter = createTRPCRouter({
  updateRole: protectedProcedure
    .input(
      z.object({ userId: z.string().cuid(), role: z.nativeEnum(UserRole) })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: input.userId,
          },
          data: {
            role: input.role,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  joinTeam: protectedProcedure
    .input(z.object({ teamId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            teamId: input.teamId,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
