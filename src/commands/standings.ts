import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { ICommand } from '../interfaces/Command';
import { getStandings } from '../modules/getStandings';
import { getSpacer } from '../utils/getSpacer';
import { padValue } from '../utils/padValue';

export const latest: ICommand = {
  data: new SlashCommandBuilder()
    .setName('standings')
    .setDescription('Show current standings'),
  run: async (interaction) => {
    await interaction.deferReply();

    const competitionId = 42122;
    const season = 'Season 5';

    const standings = await getStandings();

    const markup = standings.map((row) => {
      const { position, points, team_name, wins, draws, losses } = row;

      // prettier-ignore
      return `${position}   ${team_name}${padValue(Number(points))}  ${padValue(Number(wins))}   ${padValue(Number(draws))}    ${padValue(Number(losses))}\n`;
    });

    const embed = new MessageEmbed()
      /*
       * Alternatively, use "#3498DB", [52, 152, 219] or an integer number.
       */
      .setColor(0x3498db)
      /*.setAuthor(
        'Author Name, it can hold 256 characters',
        'https://i.imgur.com/lm8s41J.png'
      )
      */
      .setTitle(`Gymnasiebowl`)
      .setURL(`https://www.mordrek.com/gspy/comp/${competitionId}`)
      /* .setDescription(
        `[${
          homeCoach || 'AI'
        }](https://www.mordrek.com/gspy/comp/${competitionId}/coach/${homeCoachId}) - [${
          awayCoach || 'AI'
        }](https://www.mordrek.com/gspy/comp/${competitionId}/coach/${awayCoachId})`
      ) */
      //.setImage('http://i.imgur.com/yVpymuV.png')
      //.setThumbnail('http://i.imgur.com/p2qNFag.png')
      // prettier-ignore
      .addField(
        `Standings for ${season}`,
        `\`\`\`css
Pos Team${getSpacer(standings, 'team_name', 4)}Pts Win Draw Loss
${markup.join('')}\`\`\``
      );

    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    /*
      .addFields(
        {
          name: 'Inline fields',
          value:
            'They can have different fields with small headlines, and you can inline them.',
          inline: true,
        },
        {
          name: 'Masked links',
          value:
            'You can put [masked links](https://discord.js.org/#/docs/main/master/class/MessageEmbed) inside of rich embeds.',
          inline: true,
        },
        {
          name: 'Markdown',
          value: 'You can put all the *usual* **__Markdown__** inside of them.',
          inline: true,
        }
      )
      */
    /*
     * Blank field, useful to create some space.
     */
    //.addField('\u200b', '\u200b')
    /*
     * Takes a Date object, defaults to current date.
     */
    //.setTimestamp(new Date(finished));
    /* .setFooter(
          'This is the footer text, it can hold 2048 characters',
          'http://i.imgur.com/w1vhFSR.png'
        ); */

    if (standings && standings.length > 0) {
      await interaction.editReply({ embeds: [embed] });
    }
  },
};
