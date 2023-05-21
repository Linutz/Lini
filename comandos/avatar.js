const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: "avatar",
  alias: ["av"],
  async execute(client, message, args) {
    let targetUser = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const avatarButton = new MessageButton()
      .setCustomId('avatar_button')
      .setLabel('Avatar')
      .setStyle('PRIMARY');

    const bannerButton = new MessageButton()
      .setCustomId('banner_button')
      .setLabel('Banner')
      .setStyle('PRIMARY');

    const row = new MessageActionRow().addComponents(avatarButton, bannerButton);

    const embed = new MessageEmbed()
      .setTitle(`Avatar y Banner`)
      .setDescription(`**Haz clic en uno de los botones para ver el avatar o el banner de ${targetUser.username}**`)
      .setColor('#00FF00');

    const reply = await message.reply({ embeds: [embed], components: [row] });

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = reply.createMessageComponentCollector({ filter });

    collector.on('collect', async (interaction) => {
      if (interaction.customId === 'avatar_button') {
        const avatarEmbed = new MessageEmbed()
          .setTitle('Avatar')
          .setColor("RANDOM")
          .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 4096 }));

        await interaction.update({ content: `**Aquí está el avatar de ${targetUser.username}:**`, embeds: [avatarEmbed] });
      } else if (interaction.customId === 'banner_button') {
        const member = message.guild.members.cache.get(targetUser.id);

        await member.user.fetch();
        const bannerURL = member.user.bannerURL({ dynamic: true, size: 4096 });

        if (bannerURL) {
          const bannerEmbed = new MessageEmbed()
            .setTitle('Banner')
            .setColor("RANDOM")
            .setImage(bannerURL)

          await interaction.update({ content: `**Aquí está el banner de ${targetUser.username}:**`, embeds: [bannerEmbed] });
        } else {
          await interaction.update({ content: `**${targetUser.username} no tiene un banner configurado. Pero puedes seguir viendo su hermoso avatar**` });
        }
      }
    });

    collector.on('end', () => {
      reply.edit({ components: [] });
    });
  }
};
                   