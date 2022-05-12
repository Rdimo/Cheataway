import { getDiscordInvite } from './invite';

const createMetaTags = (name: string, content: string, property?: boolean) => {
  const link = document.createElement('meta');
  if (property) link.setAttribute('property', `og:${name}`);
  else link.setAttribute('name', name);
  link.content = content;
  document.getElementsByTagName('head')[0].appendChild(link);
};

createMetaTags('viewport', 'width=device-width, initial-scale=1.0');
createMetaTags('theme-color', '#444444');
createMetaTags('author', 'Rdimo');
createMetaTags('owner', 'Rdimo');
createMetaTags('copyright', 'Rdimo');
createMetaTags('designer', 'Rdimo');
createMetaTags('reply-to', 'contact.rdimo@gmail.com');
createMetaTags('language', 'EN');
createMetaTags('coverage', 'worldwide');
createMetaTags('rating', 'general');
createMetaTags('robots', 'all');
createMetaTags('googlebot', 'all');
createMetaTags('googlebot-news', 'all');
createMetaTags('revisit-after', '1 day');
createMetaTags('url', window.location.href);
createMetaTags('identifier-URL', window.location.href);

createMetaTags('type', 'website', true);
createMetaTags('site_name', 'website', true);
createMetaTags('description', `〢discord.gg/${getDiscordInvite()}`, true);
