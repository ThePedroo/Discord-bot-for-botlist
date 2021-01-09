const Discord = require('discord.js')
module.exports = {
 name: 'addbot',
 description: 'Adicione um BOT!',
 cooldown: 60,
run: async(client, message, args) => {
  let embed = new Discord.MessageEmbed()
  .setTitle('Qual ė o ID de seu BOT?')
  .setDescription('Nome: `...`\nID: `...`\nDescrição: `...`\nLinguagem: `...`\nPrefix: `...`')
  
  message.channel.send(embed).then(msg => {
     
      message.channel.createMessageCollector((x) => x.author.id == message.author.id).on('collect', async (id) => {
        id = id.content
        
        embed.setTitle('Qual ė a descrição do seu BOT?')
        embed.setDescription(`Nome: \`${client.users.fetch(id).then(x => x.tag)}`\nID: \`${id}\`\nDescrição: \`...\`\nLinguagem: \`...\`\nPrefix: \`...\``)
      })  
    })
  }
}
