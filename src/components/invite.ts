import storage from '@/assets/storage.json';

export const getDiscordInvite = (fullUrl?: boolean) => {
  if (fullUrl) return `https://discord.com/invite/${storage.discord_inv}`;
  return storage.discord_inv;
};
