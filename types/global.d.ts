declare global {
  type SiteConfig = {
    name: string;
    handle: string;
    description: string;
    url: string;
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
