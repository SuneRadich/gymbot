import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { ICommand } from '../interfaces/Command';
import { getLatestMatchData } from '../modules/getLatestMatchData';
import { sendMatchReport } from '../modules/sendMatchReport';

export const match: ICommand = {
  data: new SlashCommandBuilder()
    .setName('latest')
    .setDescription('Show latest match'),
  run: async (interaction) => {
    await interaction.deferReply();

    const matchData = await getLatestMatchData();

    console.log('Latest match data', matchData);
    const message = new MessageEmbed();

    if (matchData) {
      sendMatchReport(matchData);

      await interaction.editReply({ embeds: [message] });
    }
  },
};
