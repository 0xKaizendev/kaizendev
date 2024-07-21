// import { commentRouter } from "@/server/api/routers/comment"
// import { likeRouter } from "@/server/api/routers/like"
// import { reactionRouter } from "@/server/api/routers/reaction"
import { viewRouter } from "@/server/api/routers/view"
import { createCallerFactory, createTRPCRouter, publicProcedure } from "@/server/api/trpc"

export const appRouter = createTRPCRouter({

  // comment: commentRouter,
  // reaction: reactionRouter,
  view: viewRouter,
  // like: likeRouter,
  // todos: publicProcedure.query(() => {
  //   return [{ id: 1, text: 'hello' }]
  // })
})

export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)