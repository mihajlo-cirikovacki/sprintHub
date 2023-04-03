import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export enum IssuePriorityEnum {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export const createIssueScheme = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.nativeEnum(IssuePriorityEnum).default(IssuePriorityEnum.MEDIUM),
  columnId: z.string(),
  assigneeId: z.string(),
});

export type CreateIssueType = z.infer<typeof createIssueScheme>;

export const issueRouter = createTRPCRouter({
  // QUERIES:
  getAll: protectedProcedure
    .input(z.object({ columnId: z.string() }))
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
    .input(z.object({ id: z.string() }))
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
