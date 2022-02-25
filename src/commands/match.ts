import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { ICommand } from '../interfaces/Command';
import { getLatestMatchData } from '../modules/getLatestMatchData';

export const match: ICommand = {
  data: new SlashCommandBuilder()
    .setName('latest')
    .setDescription('Show latest match'),
  run: async (interaction) => {
    await interaction.deferReply();

    const matchData = await getLatestMatchData();

    const message = new MessageEmbed();

    if (matchData) {
      message.setTitle(`${matchData?.coach_name}`);

      await interaction.editReply({ embeds: [message] });
    }
  },
};
