import { format } from 'date-fns';
import { MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';
import { IMatch } from '../database/models/MatchModel';
import { Match } from '../interfaces/MatchReponse';
import { padStringToLength } from '../utils/padStringToLength';

/* const getSkill = (name: string) => {
  return client.emojis.cache.find((emoji) => emoji.name === name);
};
 */
const getLogo = (name: string) => {
  return client.emojis.cache.find((emoji) => {
    return emoji.name === `Logo_${name}`;
  });
};

export const sendMatchReport = async (
  embed: MessageEmbed | undefined,
  channelId: string
) => {
  if (!embed) {
    return;
  }

  const channel: TextChannel = (await client.channels.cache.get(
    channelId
  )) as TextChannel;

  channel?.send({ embeds: [embed] });
};

export const buildMatchReport = async (result: Match | null) => {
  if (!result) return;

  const { finished } = result;

  const home = result.teams[0];
  const homeCoach = result.coaches[0];

  const away = result.teams[1];
  const awayCoach = result.coaches[1];

  if (!(home && away)) {
    return;
  }

  const buildMarkup = () => {
    const homeLength = String(home.value).length;

    // prettier-ignore
    return `
Team value    ${padStringToLength(String(home.value), homeLength)} ${away.value}
Touchdowns    ${padStringToLength(String(home.inflictedtouchdowns), homeLength)} ${away.inflictedtouchdowns}
Completions   ${padStringToLength(String(home.inflictedpasses), homeLength)} ${away.inflictedpasses}
Interceptions ${padStringToLength(String(home.inflictedinterceptions), homeLength)} ${away.inflictedinterceptions}
Blocks        ${padStringToLength(String(home.inflictedtackles), homeLength)} ${away.inflictedtackles}
Armor breaks  ${padStringToLength(String(home.inflictedinjuries), homeLength)} ${away.inflictedinjuries}
Casualties    ${padStringToLength(String(home.inflictedcasualties), homeLength)} ${away.inflictedcasualties}
Kills         ${padStringToLength(String(home.inflicteddead), homeLength)} ${away.inflicteddead}
Surf          ${padStringToLength(String(home.inflictedpushouts), homeLength)} ${away.inflictedpushouts}
Possession    ${padStringToLength(String(home.possessionball), homeLength)} ${away.possessionball}`;
  };

  const markup = buildMarkup();

  const { teamname: homeTeam, teamlogo: homeLogo } = home;

  const { teamname: awayTeam, teamlogo: awayLogo } = away;

  const leagueLogo = await client.emojis.cache.find(
    (emoji) => emoji.name === 'Logo_Human_14'
  );

  const embed = new MessageEmbed()
    .setColor(0xd9aa3b)
    .setTitle(
      `${homeTeam} ${getLogo(homeLogo || 'Ai_01')} vs ${getLogo(
        awayLogo || 'Ai_01'
      )} ${awayTeam}`
    )
    .setThumbnail(leagueLogo ? leagueLogo.url : '')
    //.setURL(
    //  `https://www.mordrek.com/gspy/comp/${competitionId}/match/${matchId}`
    //)
    .setDescription(
      `${homeCoach.coachname || 'AI'}- ${awayCoach.coachname || 'AI'}`
    )
    .addField(
      'Match report',
      `
\`\`\`hy${markup}\`\`\``
    )
    // prettier-ignore
    .setFooter({
      text: `${format(new Date(finished), 'dd-MM-yyyy')} @ ${format(
        new Date(finished),
        'kk:mm'
      )}`,
    });

  return embed;
};
