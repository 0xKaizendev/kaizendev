// const { PrismaClient } = require("@prisma/client")
import { PrismaClient } from "@prisma/client";
const database = new PrismaClient()

async function run() {
    try {
        const stackNames = [
            "TypeScript",
            "Solidity",
            "Git",
            "MongoDB",
            "Framer Motion",
            "HardHat",
            "TRPC",
            "Tailwind CSS",
            "Next.Js",
            "Postgresql"
        ];

        const stacks = await Promise.all(stackNames.map(async (name) => {
            return database.stack.upsert({
                where: { name },
                update: {},
                create: { name }
            });
        }));

        // Create a new project and connect it to the created stacks
        const project = await database.project.create({
            data: {
                title: "Personal portfolio",
                
                slug: "kaizendev.me",
                description: "My personal portfolio website, built with Next.js, Tailwind CSS, TRPC, and TypeScript. It's a place where I can showcase my work and share my thoughts.",
                imageUrl: "/images/projects/blog.png",
                githubUrl: "https://github.com/0xKaizendev/kaizendev",
                demoUrl: "https://kaizendev.me",
                content: "Kaizendev.me is my personal portfolio website, built with Next.js, Tailwind CSS, TRPC, and TypeScript. It's a place where I can showcase my work and share my thoughts.",
                isFeature: true,
                stacks: {
                    connect: stacks.map(stack => ({ id: stack.id }))
                }
            },
        });
    

        console.log("Success")
    } catch (error) {
        console.log("Error seeding the database project", error)
    } finally {
        await database.$disconnect()
    }
}

run()
