import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { ICommand } from '../interfaces/Command';
import { getLeague } from '../modules/getLeague';

export const league: ICommand = {
  data: new SlashCommandBuilder()
    .setName('league')
    .setDescription('Register a GoblinSpy league')
    .addStringOption((option) =>
      option
        .setName('leagueid')
        .setDescription('The GoblinSpy league id')
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();

    const leagueId = interaction.options.getString('leagueid', true);

    const leagueData = await getLeague(Number(leagueId));

    if (leagueData && leagueData.length > 0) {
      const embed = new MessageEmbed();

      embed.setColor(0xd9aa3b).setTitle(`League data added: ${leagueId}`);

      await interaction.editReply({ embeds: [embed] });
    }
  },
};
