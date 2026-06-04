export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
}

export interface TechItem {
  id: string;
  name: string;
  imageUrl?: string;
  letter?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  featured: boolean;
  bgTheme?: string;
}

export interface NavListItem {
  label: string;
  href: string;
}

export interface HeroContent {
  badgeText: string;
  titlePrefix: string;
  titleSuffix: string;
  accentWord: string;
  description: string;
  viewWorkButton: string;
  techButton: string;
  experienceValue: string;
  experienceSuffix: string;
  avatarUrl: string;
  altAvatarUrl: string;
  statusIndicator: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutSectionData {
  badge: string;
  title: string;
  paragraphs: string[];
  stats: StatItem[];
}

export interface StackSectionData {
  title: string;
}

export interface ServicesSectionData {
  badge: string;
  title: string;
}

export interface PortfolioSectionData {
  badge: string;
  title: string;
  actionText: string;
}

export interface ContactSectionData {
  title: string;
  description: string;
  email: string;
  telegram: string;
  submitButton: string;
  successTitle: string;
  successMessage: string;
}

export interface FooterContent {
  tagline: string;
  links: { label: string; url: string }[];
}

export interface ContentData {
  siteName: string;
  navigation: NavListItem[];
  hero: HeroContent;
  sections: {
    stack: StackSectionData;
    services: ServicesSectionData;
    portfolio: PortfolioSectionData;
    about: AboutSectionData;
    contact: ContactSectionData;
  };
  footer: FooterContent;
}

export interface PortfolioData {
  projects: Project[];
  techStack: TechItem[];
  services: Service[];
}
