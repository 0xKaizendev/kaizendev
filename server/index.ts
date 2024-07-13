import { db } from './db';
import { publicProcedure, createTRPCRouter } from './api/trpc';

const appRouter = createTRPCRouter({
    userList: publicProcedure
        .query(async () => {
            // Retrieve users from a datasource, this is an imaginary database
            const users = await db.user.findMany();
            return users;
        }),
});