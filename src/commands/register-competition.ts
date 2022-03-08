import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import ChannelCompetition from '../database/models/ChannelCompetition';
import { ICommand } from '../interfaces/Command';
import { logger } from '../utils/logger';

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
    await interaction.deferReply();

    const messageEmbed = new MessageEmbed();

    try {
      const competitionId = interaction.options.getString(
        'competitionid',
        true
      );

      const channel = interaction.channelId;

      await ChannelCompetition.create({
        channelId: channel,
        competitionId: competitionId,
      });

      messageEmbed.addFields({
        name: `Set competitionId`,
        value: `New competition id to follow is: ${competitionId}`,
        inline: false,
      });
    } catch (err) {
      logger.error(err);
    }

    await interaction.editReply({ embeds: [messageEmbed] });
  },
};
