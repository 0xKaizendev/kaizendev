import { navbarLinks } from "@/config/nav-links";


declare global {
   type SectionName = (typeof navbarLinks)[number]['title']

     type Education = {
        school: string;
        schoolURL: string;
        schoolLocation: string;
        degree: string;
        major: string;
        minor: string;
        date: string;
        description: string;
        activitiesandsocieties: string[];
      };
       type SiteConfig = {
        name: string;
        handle: string;
        description: string;
        url: string;
        ogImage: string;
        links: {
          mail: string;
          twitter: string;
          github: string;
        };
        author: {
          name: string;
          email: string;
        };
      };
       type NavItem = {
        title: string;
        id: string;
      };
      
       interface ContentNavItem extends NavItem {
        href: string;
      }
      
       interface UseData {
        name: string;
        description?: string;
        icon: (props: React.ComponentProps<"svg">) => JSX.Element;
        link?: string;
        hoverColor?: string;
      }
      
       type Project = {
        title: string;
        description: string;
        link: {
          href: string;
          label: string;
        };
        logo: {
          src: string;
          alt: string;
        };
      };
}