import { SlashCommandBuilder } from '@discordjs/builders';
import { ICommand } from '../interfaces/Command';

export const sendInvite: ICommand = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Show invite link'),
  run: async (interaction) => {
    await interaction.deferReply();

    const invite = await interaction.client.generateInvite({
      scopes: ['bot', 'applications.commands'],
      permissions: '534723950656',
    });
    await interaction.editReply(invite);
  },
};
