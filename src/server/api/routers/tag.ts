import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const createTagScheme = z.object({
  name: z.string(),
  boardId: z.string(),
});

export type CreateTagType = z.infer<typeof createTagScheme>;

export const tagRouter = createTRPCRouter({
  // QUERIES:
  getAll: protectedProcedure
    .input(z.object({ boardId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.tag.findMany({
        where: {
          boardId: input.boardId,
        },
      });
    }),

  // MUTATIONS:
  create: protectedProcedure
    .input(createTagScheme)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.tag.create({
          data: {
            name: input.name,
            boardId: input.boardId,
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
        await ctx.prisma.tag.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
