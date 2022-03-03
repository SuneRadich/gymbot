import { MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';

const getSkill = (name: string) => {
  return client.emojis.cache.find((emoji) => emoji.name === name);
};

const getLogo = (name: string) => {
  return client.emojis.cache.find((emoji) => {
    return emoji.name === `Logo_${name}`;
  });
};

(async () => {
  client.once('ready', async () => {
    const channel: TextChannel = (await client.channels.cache.get(
      '943137040436961294'
    )) as TextChannel;

    const embed = new MessageEmbed()
      /*
       * Alternatively, use "#3498DB", [52, 152, 219] or an integer number.
       */
      .setColor(0x3498db)
      /* .setAuthor(
      'Author Name, it can hold 256 characters',
      'https://i.imgur.com/lm8s41J.png'
    ) */
      .setTitle(
        `${getLogo('Lizardman_17')} <-- logo skill --> ${getSkill('Block')}`
      )
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp();
    /* .setFooter(
      'This is the footer text, it can hold 2048 characters',
      'http://i.imgur.com/w1vhFSR.png'
    ); */

    channel?.send({ embeds: [embed] });
  });
})();
