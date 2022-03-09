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

export const sendMatchReport = async (
  embed: MessageEmbed,
  channelId: number
) => {
  const channel: TextChannel = (await client.channels.cache.get(
    String(channelId)
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

  const leagueLogo = await client.emojis.cache.find(
    (emoji) => emoji.name === 'Logo_Human_14'
  );

  const embed = new MessageEmbed()
    /*
     * Alternatively, use "#3498DB", [52, 152, 219] or an integer number.
     */
    .setColor(0x3498db)
    .setTitle(
      `${homeTeam} ${getLogo(homeLogo || 'Ai_01')} vs ${getLogo(
        awayLogo || 'Ai_01'
      )} ${awayTeam}`
    )
    .setThumbnail(leagueLogo ? leagueLogo.url : '')
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
    .addField(
      'Match report',
      `
\`\`\`ml${markup}\`\`\``
    )
    .setTimestamp(new Date(finished));

  return embed;
};
