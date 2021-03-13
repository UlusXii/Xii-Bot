const db = require('quick.db');
const Discord = require('discord.js');
const message = require('../events/message');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  const ytsorgu = db.fetch(`${message.author.id}.yetki`)  
    if(ytsorgu != 1) return message.channel.send(`${message.author}, üzgünüm bu komutu kullanabilmek için yetkili olmalısınız.`)
    else{
    
    let etiket = message.mentions.members.first();
    
    let user = message.author
    if(!etiket){
    db.add(`${user.id}.money`, args[0]) 
    let bal = await db.fetch(`${user.id}.money`)

    let embed = new Discord.RichEmbed()
    .setAuthor(`Para eklendi!`,message.author.displayAvatarURL)
    .addField(`Verilen Miktar:`, `${args[0]}`)
    .addField(`Cüzdanındaki para: `,`${bal}`)
    .setColor("#D3D3D3")
    .setTimestamp()
        message.channel.sendEmbed(embed);
    }
    if(etiket)
    {
    let isim = etiket.name;
    console.log(isim)
    console.log(etiket.name)
    console.log(etiket.tag)
    db.add(`${etiket.id}.money`, args[1])
    let bal = await db.fetch(`${etiket.id}.money`)

    let embed = new Discord.RichEmbed()
    .setAuthor(`Etiketlenen kişiye para verildi.`,message.author.displayAvatarURL)
    .addField(`Verilen Miktar:`, `${args[1]}`)
    .addField(`Cüzdanındaki para: `,`${bal}`)
    .setColor("#D3D3D3")
    .setTimestamp()
    message.channel.sendEmbed(embed);
    }
  }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['add','ekle']
    
  };
  
  exports.help = {
    name: 'ekle',
    description: 'Para ekleme komutu.',
    usage: 'ekle'
  };