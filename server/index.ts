import { procedure, router } from './trpc'

export const appRouter = router({
    getUser: procedure.query(() => {

    })
})