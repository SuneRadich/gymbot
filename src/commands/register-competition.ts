import { SlashCommandBuilder } from '@discordjs/builders';
import { Permissions } from 'discord.js';
import ChannelCompetition from '../database/models/ChannelCompetition';
import { ICommand } from '../interfaces/Command';
import * as NewGames from '../cron/newGames';

export const registerCompetition: ICommand = {
  data: new SlashCommandBuilder()
    .setName('register-competition')
    .setDescription('Register active competition for the channel')
    .addStringOption((option) =>
      option
        .setName('leaguename')
        .setDescription('The name of the league')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('competitionname')
        .setDescription('The name (see /list) of the competition')
        .setRequired(true)
    ),
  run: async (interaction) => {
    let leagueName: string | null = null;
    let competitionName: string | null = null;

    leagueName = interaction.options.getString('leaguename', true);

    // Grab the entered competition id
    competitionName = interaction.options.getString('competitionname', true);

    const applicationId = interaction.applicationId;

    // Check if the user is in fact an administrator
    if (interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
      const channel = interaction.channelId;

      await ChannelCompetition.updateOne(
        { channelId: channel, applicationId: applicationId },
        {
          leagueName,
          channelId: channel,
          applicationId: applicationId,
          competitionName: competitionName,
        },
        { upsert: true }
      );

      // Restart fetching loop with new set of id's
      NewGames.killFetcher();
      NewGames.startFetcher();

      await interaction.reply({
        content: `New competition to follow: ${competitionName}`,
        // Send message only the user that requested it can see
        ephemeral: true,
      });
    }
  },
};
