import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const userRouter = createTRPCRouter({
  updateRole: protectedProcedure
    .input(z.object({ role: z.nativeEnum(UserRole) }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          role: input.role,
        },
      });
    }),
});
