import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import { CommandList } from '../commands/_CommandList';
import * as NewGames from '../cron/newGames';
import { logger } from '../utils/logger';

export const onReady = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(
    process.env.DISCORD_TOKEN as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationGuildCommands(
      client.user?.id || 'missing id',
      process.env.GUILD_ID as string
    ),
    { body: commandData }
  );

  logger.info('Discord ready!');

  // Start loop to look for new played matches
  NewGames.startFetcher();
};
