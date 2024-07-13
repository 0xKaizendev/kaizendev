import { ContentNavItem, NavItem } from "@/types"

const moreContent: ContentNavItem[] = [


]

export const navbarLinks: NavItem[] = [
    {
        title: "Home",
        href: "/projects",
        description: "Collections of posts on a particular topic.",
    },
    {
        title: "About",
        href: "/blog",
        description:
            "Code snippets that I use often. Mostly for personal reference.",
    },
    {
        title: "Blog",
        href: "/notes",
        description: "My notes on various topics. Mostly for personal reference.",
    },
    //   {
    //     title: "More",
    //     content: moreContent,
    //   },
]
