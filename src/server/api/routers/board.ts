import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

const CreateBoardScheme = z.object({
  name: z.string(),
  teamId: z.string().cuid(),
});

export const boardRouter = createTRPCRouter({
  // QUERIES:
  getAll: protectedProcedure
    .input(z.object({ teamId: z.string().cuid() }))
    .query(({ ctx }) => {
      return ctx.prisma.board.findMany();
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.board.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  // MUTATIONS:
  create: protectedProcedure
    .input(CreateBoardScheme)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.board.create({
          data: {
            name: input.name,
            teamId: ctx.session.user.teamId,
            columns: {
              create: [
                { name: 'Backlog' },
                { name: 'Todo' },
                { name: 'In Progress' },
                { name: 'Done' },
              ],
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.board.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
