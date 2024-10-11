export type Education = {
  school: string;
  schoolURL: string;
  schoolLogo: string;
  schoolLocation: string;
  degree: string;
  major: string;
  minor: string;
  date: string;
  description: string;
  activitiesandsocieties: string[];
};
export type SiteConfig = {
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
export type NavItem = {
  title: string;
  href?: string;
  disabled?: boolean;
  description?: string;
  content?: ContentNavItem[];
};

export interface ContentNavItem extends NavItem {
  href: string;
}

export interface UseData {
  name: string;
  description?: string;
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  link?: string;
  hoverColor?: string;
}
