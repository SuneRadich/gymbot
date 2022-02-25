// Require the necessary discord.js classes
import { Client } from 'discord.js';
import { IntentOptions } from './config/IntentOptions';
import { connectDatabase } from './database/connectDatabase';
import { onInteraction } from './events/onInteraction';
import { onReady } from './events/onReady';
import { validateEnv } from './utils/validateEnv';

(async () => {
  if (!validateEnv()) return;

  // Create a new client instance
  const client = new Client({ intents: IntentOptions });

  // When the client is ready, run this code (only once)
  client.once('ready', async () => onReady(client));

  client.on('error', (err) => {
    console.log('ERROR', err);
  });

  client.on('debug', (info) => {
    console.log('DEBUG', info);
  });

  client.on(
    'interactionCreate',
    async (interaction) => await onInteraction(interaction)
  );

  await connectDatabase();

  client.login(process.env.DISCORD_TOKEN);
})();
