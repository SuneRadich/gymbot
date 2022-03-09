import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import ChannelCompetition from '../database/models/ChannelCompetition';
import { ICommand } from '../interfaces/Command';
import { getStandings } from '../modules/getStandings';
import { getSpacer } from '../utils/getSpacer';
import { logger } from '../utils/logger';
import { padValue } from '../utils/padValue';

export const latest: ICommand = {
  data: new SlashCommandBuilder()
    .setName('standings')
    .setDescription('Show current standings'),
  run: async (interaction) => {
    await interaction.deferReply();

    //const competitionId = 46302; // 42122;
    const season = 'Season 5';

    const channelCompetition = await ChannelCompetition.findOne({
      channelId: interaction.channelId,
    });

    if (!channelCompetition) {
      logger.error(`No competition registered for this channel!`);
      await interaction.editReply(
        'No competition registered, use /competition <GoblinSpyCompetitionID> to do so'
      );
      return;
    }

    const competitionId = channelCompetition.competitionId;

    const standings = await getStandings(channelCompetition?.competitionId);

    const markup = standings.map((row) => {
      const { position, points, team_name, wins, draws, losses } = row;

      // prettier-ignore
      return `${position}   ${team_name}${padValue(Number(points))}   ${padValue(Number(wins))}  ${padValue(Number(draws))}     ${padValue(Number(losses))}\n`;
    });

    const embed = new MessageEmbed()
      /*
       * Alternatively, use "#3498DB", [52, 152, 219] or an integer number.
       */
      .setColor(0x3498db)
      .setTitle(`Gymnasiebowl`)
      .setURL(`https://www.mordrek.com/gspy/comp/${competitionId}`)
      // prettier-ignore
      .addField(
        `Standings for ${season}`,
        `\`\`\`hy
Pos Team${getSpacer(standings, 'team_name', 4)} Pts Win Draw Loss
${markup.join('')}\`\`\``
      );

    if (standings && standings.length > 0) {
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
