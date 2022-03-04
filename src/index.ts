// Require the necessary discord.js classes
import { Client } from 'discord.js';
import { IntentOptions } from './config/IntentOptions';
import { connectDatabase } from './database/connectDatabase';
import { onInteraction } from './events/onInteraction';
import { onReady } from './events/onReady';
import { logger } from './utils/logger';
import { validateEnv } from './utils/validateEnv';

// Create a new client instance
export const client = new Client({
  intents: IntentOptions,
});

(async () => {
  if (!validateEnv()) return;

  // When the client is ready, run this code (only once)
  client.once('ready', async () => onReady(client));

  client.on('error', (err) => {
    logger.error(err);
  });

  client.on('debug', (info) => {
    // console.log('DEBUG', info);
  });

  client.on(
    'interactionCreate',
    async (interaction) => await onInteraction(interaction)
  );

  await connectDatabase();

  client.login(process.env.DISCORD_TOKEN);
})();
