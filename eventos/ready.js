const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Logged in as ${client.user.tag}`);

    const activities = [
      `prefix: !`,
      `Viendo ${client.guilds.cache.size} servers`,
      `Viendo ${client.users.cache.size} usuarios`
    ];

    let i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "PLAYING" }), 15000);

    const embed = new MessageEmbed()
      .setColor('GREEN')
      .setTitle('Bot en línea!')
      .setDescription(`El bot está en línea en ${client.guilds.cache.size} servidores con un total de ${client.users.cache.size} usuarios.`)
      .setTimestamp();

    const channel = client.channels.cache.get('1093201652158300280');
    if (channel) {
      channel.send({ embeds: [embed] });
    }
  }
};
