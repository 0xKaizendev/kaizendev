declare global {
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
      linkedin: string;
    };
    author: {
      name: string;
      email: string;
    };
  };
}

export {};
