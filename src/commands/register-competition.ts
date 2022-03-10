import { SlashCommandBuilder } from '@discordjs/builders';
import { Permissions } from 'discord.js';
import ChannelCompetition from '../database/models/ChannelCompetition';
import { ICommand } from '../interfaces/Command';

export const registerCompetition: ICommand = {
  data: new SlashCommandBuilder()
    .setName('competition')
    .setDescription('Register active competition for the channel')
    .addStringOption((option) =>
      option
        .setName('competitionid')
        .setDescription('The message to go in your 100 Days of Code update.')
        .setRequired(true)
    ),
  run: async (interaction) => {
    let competitionId = null;

    // Grab the entered competition id
    competitionId = interaction.options.getString('competitionid', true);

    // Check if the user is in fact an administrator
    if (interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
      const channel = interaction.channelId;

      await ChannelCompetition.updateOne(
        { channelId: channel },
        { $set: { competitionId: competitionId } },
        { upsert: true }
      );

      await interaction.reply({
        content: `New competition id to follow is: ${competitionId}`,
        // Send message only the user that requested it can see
        ephemeral: true,
      });
    }
  },
};
