import { IssuePriority } from '@prisma/client';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export const createIssueScheme = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.nativeEnum(IssuePriority).default(IssuePriority.MEDIUM),
  columnId: z.string(),
  assigneeId: z.string().cuid(),
});

export type CreateIssueType = z.infer<typeof createIssueScheme>;

export const issueRouter = createTRPCRouter({
  // QUERIES:
  getAll: protectedProcedure
    .input(z.object({ columnId: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.issue.findMany({
        where: {
          columnId: input.columnId,
        },
      });
    }),

  // MUTATIONS:
  create: protectedProcedure
    .input(createIssueScheme)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.issue.create({
          data: {
            name: input.name,
            description: input.description,
            priority: input.priority,
            columnId: input.columnId,
            assigneeId: input.assigneeId,
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
        await ctx.prisma.issue.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
