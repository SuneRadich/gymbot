import { SlashCommandBuilder } from '@discordjs/builders';
import { Permissions } from 'discord.js';
import fetch from 'node-fetch';
import { ICommand } from '../interfaces/Command';
import { ILeagueCompetitions } from '../interfaces/LeagueCompetitions';

export const listCompetitions: ICommand = {
  data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('List competitions of a given league')
    .addStringOption((option) =>
      option
        .setName('leaguename')
        .setDescription('The name of the league')
        .setRequired(true)
    ),
  run: async (interaction) => {
    let leagueName = null;

    const api_key = process.env.CYANIDE_API_KEY;

    // Grab the entered competition id
    leagueName = interaction.options.getString('leaguename', true);

    const url = `https://web.cyanide-studio.com/ws/bb/competitions/?key=${api_key}&league=${leagueName}&platform=pc&exact=1`;

    const response = await fetch(url);

    const data = (await response.json()) as ILeagueCompetitions;

    const competitions = data.competitions;

    const applicationId = interaction.applicationId;

    // Check if the user is in fact an administrator
    if (interaction.memberPermissions?.has(Permissions.FLAGS.ADMINISTRATOR)) {
      await interaction.reply({
        content: `Listing competitions from ${leagueName}\n 
${competitions.map((competition) => competition.name).join('\n')}`,

        // Send message only the user that requested it can see
        ephemeral: true,
      });
    }
  },
};
