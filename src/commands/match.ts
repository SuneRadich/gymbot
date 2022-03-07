import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../interfaces/Command';
import { getLatestMatchData } from '../modules/getLatestMatchData';
import { buildMatchReport } from '../modules/sendMatchReport';

export const match: ICommand = {
  data: new SlashCommandBuilder()
    .setName('latest')
    .setDescription('Show latest match'),
  run: async (interaction) => {
    await interaction.deferReply();

    const matchData = await getLatestMatchData();

    if (matchData && matchData.length > 0) {
      const report = await buildMatchReport(matchData[0]);

      if (report) {
        await interaction.editReply({ embeds: [report] });
      }
    }
  },
};
