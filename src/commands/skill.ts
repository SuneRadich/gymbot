import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { ICommand } from '../interfaces/Command';
import { getSkillData } from '../modules/getSkillData';

export const skill: ICommand = {
  data: new SlashCommandBuilder()
    .setName('skill')
    .setDescription('Check in for the 100 Days of Code challenge.')
    .addStringOption((option) =>
      option
        .setName('message')
        .setDescription('The message to go in your 100 Days of Code update.')
        .setRequired(true)
    ),
  run: async (interaction) => {
    await interaction.deferReply();
    const text = interaction.options.getString('message', true);
    const emoji = await getSkillData(text);

    const emojiEmbed = new MessageEmbed();

    emojiEmbed.setTitle(`<:${emoji.name}:${emoji.id}>`);
    emojiEmbed.setDescription(`<:${emoji.name}:${emoji.id}>`);

    emojiEmbed.addFields({
      name: `<:${emoji.name}:${emoji.id}>`,
      value: `<:${emoji.name}:${emoji.id}>`,
      inline: false,
    });

    await interaction.editReply({ embeds: [emojiEmbed] });
  },
};
