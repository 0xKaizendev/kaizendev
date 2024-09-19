import { ContentNavItem, NavItem } from "@/types";

const moreContent: ContentNavItem[] = [];

export const navbarLinks: NavItem[] = [
  {
    title: "Home",
    href: "/",
    description: "Collections of posts on a particular topic.",
  },
  {
    title: "About",
    href: "/about",
    description:
      "Code snippets that I use often. Mostly for personal reference.",
  },
  // {
  //   title: "Blog",
  //   href: "/blog",
  //   description: "My notes on various topics. Mostly for personal reference.",
  // },
  {
    title: "Projects",
    href: "#projects",
    description: "My notes on various topics. Mostly for personal reference.",
  },
  {
    title: "Resume",
    href: "/resume",
    description: "My notes on various topics. Mostly for personal reference.",
  },
    // {
    //   title: "More",
    //   content: moreContent,
    // },
];
