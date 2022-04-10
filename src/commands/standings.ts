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

    const channelCompetition = await ChannelCompetition.findOne({
      channelId: interaction.channelId,
    });

    if (!channelCompetition) {
      logger.error(`No competition registered for this channel!`);
      await interaction.editReply(
        'No competition registered, use /register-competition <leagueName> <competitionName> to do so'
      );
      return;
    }

    const { leagueName, competitionName } = channelCompetition;

    const standings = await getStandings(leagueName, competitionName);

    const markup = standings.map((row) => {
      const { rank, score, name, win, draw, loss } = row;

      // prettier-ignore
      return `${rank}   ${name}${padValue(Number(score))}   ${padValue(Number(win))}  ${padValue(Number(draw))}     ${padValue(Number(loss))}\n`;
    });

    const embed = new MessageEmbed()
      .setColor(0x3498db)
      .setTitle(leagueName)
      //.setURL(`https://www.mordrek.com/gspy/comp/${competitionName}`)
      // prettier-ignore
      .addField(
        `Standings for ${competitionName}`,
        `\`\`\`hy
Pos Team${getSpacer(standings, 'name', 4)} Pts Win Draw Loss
${markup.join('')}\`\`\``
      );

    if (standings && standings.length > 0) {
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
