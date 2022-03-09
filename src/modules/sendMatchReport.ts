import { MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';
import { IGame } from '../database/models/MatchModel';
import { padStringToLength } from '../utils/makeSameLength';

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
    const homeLength = home.team_value.length;
    const awayLength = away.team_value.length;

    // prettier-ignore
    return `
Team value    ${padStringToLength(home.team_value, homeLength)} ${away.team_value}
Touch downs   ${padStringToLength(home.td, homeLength)} ${away.td}
Completions   ${padStringToLength(home.completions, homeLength)} ${away.completions}
Interceptions ${padStringToLength(home.interceptions, homeLength)} ${away.interceptions}
Blocks        ${padStringToLength(home.blocks_for, homeLength)} ${away.blocks_for}
Armor breaks  ${padStringToLength(home.breaks_for, homeLength)} ${away.breaks_for}
Casualties    ${padStringToLength(home.casualties_for, homeLength)} ${away.casualties_for}
Kills         ${padStringToLength(home.kills_for, homeLength)} ${away.kills_for}
Surf          ${padStringToLength(home.pushouts, homeLength)} ${away.pushouts}
Possession    ${padStringToLength(home.possession, homeLength)} ${away.possession}`;
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
    .setColor(0xd9aa3b)
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
\`\`\`hy${markup}\`\`\``
    )
    .setTimestamp(new Date(finished));

  return embed;
};
