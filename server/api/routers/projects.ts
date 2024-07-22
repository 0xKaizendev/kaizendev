import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc"
import { z } from "zod"

export const projectsRouter = createTRPCRouter({
    get: publicProcedure
        .input(
            z.object({
                limit: z.number().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const projects = await ctx.db.project.findMany(
                {
                    take: input.limit,
                    orderBy: {
                        createdAt: 'desc'
                    },
                    include: {
                        stacks: true
                    }
                }
            )

            return projects
        }),
    getUnique: publicProcedure
        .input(
            z.object({
                id: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const project = await ctx.db.project.findUnique(
                {
                    where: {
                        id: input.id
                    },
                    include: {
                        stacks: true
                    }
                }
            )

            return project
        }),
})
