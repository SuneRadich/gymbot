import { MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';
import { IGame } from '../database/models/MatchModel';

const getSkill = (name: string) => {
  return client.emojis.cache.find((emoji) => emoji.name === name);
};

const getLogo = (name: string) => {
  return client.emojis.cache.find((emoji) => {
    return emoji.name === `Logo_${name}`;
  });
};

export const sendMatchReport = async (embed: MessageEmbed) => {
  const channel: TextChannel = (await client.channels.cache.get(
    '943137040436961294'
  )) as TextChannel;

  channel?.send({ embeds: [embed] });
};

export const buildMatchReport = async (result: IGame | null) => {
  if (!result) return;

  const { home, away, matchId, competitionId, finished } = result;

  if (!(home && away)) {
    return;
  }

  const buildMarkup = () => {
    return `
  TV    ${home.team_value} ${away.team_value}
  TD    ${home.td} ${away.td}
  Comp  ${home.completions} ${away.completions}
  Int   ${home.interceptions} ${away.interceptions}
  Blk   ${home.blocks_for} ${away.blocks_for}
  AvBr  ${home.breaks_for} ${away.breaks_for}
  Cas   ${home.casualties_for} ${away.casualties_for}
  Kills ${home.kills_for} ${away.kills_for}
  Surf  ${home.pushouts} ${away.pushouts}
  Pos   ${home.possession} ${away.possession}`;
  };

  const markup = buildMarkup();

  const {
    team_name: homeTeam,
    coach_name: homeCoach,
    logo: homeLogo,
    idcoach: homeCoachId,
  } = home;

  const {
    team_name: awayTeam,
    coach_name: awayCoach,
    logo: awayLogo,
    idcoach: awayCoachId,
  } = away;

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
    .setTitle(
      `${homeTeam} ${getLogo(homeLogo || 'Ai_01')} vs ${getLogo(
        awayLogo || 'Ai_01'
      )} ${awayTeam}`
    )
    .setURL(
      `https://www.mordrek.com/gspy/comp/${competitionId}/match/${matchId}`
    )
    .setDescription(
      `[${
        homeCoach || 'AI'
      }](https://www.mordrek.com/gspy/comp/${competitionId}/coach/${homeCoachId}) - [${
        awayCoach || 'AI'
      }](https://www.mordrek.com/gspy/comp/${competitionId}/coach/${awayCoachId})`
    )
    //.setImage('http://i.imgur.com/yVpymuV.png')
    //.setThumbnail('http://i.imgur.com/p2qNFag.png')
    .addField(
      'Match report',
      `
\`\`\`css${markup}\`\`\``
    )
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
    .setTimestamp(new Date(finished));
  /* .setFooter(
        'This is the footer text, it can hold 2048 characters',
        'http://i.imgur.com/w1vhFSR.png'
      ); */

  return embed;
};
