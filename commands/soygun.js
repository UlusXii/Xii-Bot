const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms')
exports.run = async (client, message, args) => {
    let user = message.author;
    let mentioned_user = message.mentions.members.first();


    let timeout = 368000;
    let soygun = await db.fetch(`${user.id}.soygun`);
    if (soygun !== null && timeout - (Date.now() - soygun) > 0) {
      let time = ms(timeout - (Date.now() - soygun));
    
      let timeEmbed = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setDescription(`**Hey dostum, biraz yavaşlamaya ne dersin?**\n ${time.hours}s ${time.minutes}d ${time.seconds}s sonra tekrar dene. `);
   
      message.channel.send(timeEmbed)
    }
    else{
    let mentioned_money  = db.fetch(`${mentioned_user.id}.money`);
    let your_money = db.fetch(`${user.id}.money`);
    if(!mentioned_user){
        message.reply("birini etiketlemelisin.");
    }
    else{
    let hesap = mentioned_money / 10;
    db.subtract(`${mentioned_user.id}.money`, hesap)
    db.add(`${user.id}.money`, hesap)
    let last_yourmoney = db.fetch(`${user.id}.money`)
    let last_mentioned = db.fetch(`${mentioned_user.id}.money`)
    message.channel.sendEmbed(new Discord.RichEmbed()
    .setTitle(`Soygun var!`)
    .addField(`${mentioned_user.user.tag}`,` adlı kişiden para çaldın!`)
    .addField(`Çaldığın tutar:`, hesap)
    .setThumbnail(mentioned_user.user.displayAvatarURL)
    .setTimestamp()
    
    )
    db.set(`${user.id}.soygun`, Date.now())
}


}}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['soygun','sn']
    
  };
  exports.help = {
    name: 'Piçi soy!',
    description: 'Lanet olası piçleri soymanın kolay yolu.',
    usage: 'xii.picisoy'
  };