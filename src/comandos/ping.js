const Discord = require('discord.js')
module.exports = {
  name: 'ping',
  cooldown: 5,
  aliases: ['p'],
run: async(client, message, args) => {
let embed = new Discord.MessageEmbed()
.setDescription(`Pong! \`${client.ws.ping}ms\`.`)

message.channel.send(embed)
  }
}  
