const Discord = require('discord.js')
exports.run = async (client, message, args) =>{
  let user = message.author
  let sorgu = args[0]
  let embed = new Discord.RichEmbed()
  
  .setTitle(`${user.username} sanırım yardıma ihtiyacın var.`,)
  .addField(`Meslek komutlarımız: `, `__.meslek, .balık, .taksi, .odun, .maden__`)
  .addField(`Eğlence komutlarımız: `,`__.blackjack, .slot, .soygun, .yazitura__`)
  .addField(`Kişisel komutlar:`,`__.profil__`)
  .setTimestamp()
  .setImage("https://i.pinimg.com/originals/bb/df/a3/bbdfa3edc21e1de194952a5c3ac6bd80.gif")
  .setColor("#D00BA6")
  if(!sorgu){
    message.channel.sendEmbed(embed)
  }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['y','yardım']
    
  };
exports.help = {
    name: 'Yardım Komutu',
    description: 'Bot üzerindeki komutların anlamlarını gösterir.',
    usage: 'y & yardım'
  };