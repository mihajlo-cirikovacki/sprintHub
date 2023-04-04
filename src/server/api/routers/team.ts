import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const CreateTeamSchema = z.object({
  name: z.string(),
  domain: z.string(),
  avatar: z.string(),
});

export type CreateTeamType = z.infer<typeof CreateTeamSchema>;

export const teamRouter = createTRPCRouter({
  // QUERIES:
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),

  // MUTATIONS:
  create: protectedProcedure
    .input(CreateTeamSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.team.create({
          data: {
            name: input.name,
            domain: input.domain,
            avatar: input.avatar,
            boards: {
              create: {
                name: "Example",
                columns: {
                  create: [
                    { name: "Backlog" },
                    { name: "Todo" },
                    { name: "In Progress" },
                    { name: "Done" },
                  ],
                },
              },
            },
          },
          include: {
            boards: {
              include: {
                columns: true,
              },
            },
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
        await ctx.prisma.team.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }),
});
