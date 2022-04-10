import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import { CommandList } from '../commands/_CommandList';
import { logger } from '../utils/logger';
import * as NewGames from '../cron/newGames';

export const onReady = async (client: Client) => {
  const rest = new REST({ version: '9' }).setToken(
    process.env.DISCORD_TOKEN as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  // Register guild specific slash commands
  // these commands register immidiately, and is available for testing
  await rest.put(
    // @see https://discordjs.guide/interactions/slash-commands.html#guild-commands
    //Routes.applicationCommand(
    Routes.applicationGuildCommands(
      client.user?.id || 'missing id',
      process.env.GUILD_ID as string
    ),
    { body: commandData }
  );

  // Register global slash commands, these update slowly, up to an hour
  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID as string), {
    body: commandData,
  });

  logger.info('Discord ready!');

  // Start loop to look for new played matches
  NewGames.startFetcher();
};
