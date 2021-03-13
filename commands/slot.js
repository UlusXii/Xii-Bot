const Discord = require('discord.js')
const slotlar = ['🔑','🗝️','🔨'];
const db = require('quick.db')
exports.run = async (client, message, args) => {

var slot1 = slotlar[Math.floor(Math.random() * slotlar.length)];
var slot2 = slotlar[Math.floor(Math.random() * slotlar.length)];
var slot3 = slotlar[Math.floor(Math.random() * slotlar.length)];
let amount = Math.floor(args[0] * 5);
let user = message.author;
let cuzdan = db.fetch(`${user.id}.money`);
let embed = new Discord.RichEmbed()
.setAuthor(`${user.tag} için slotlar çevriliyor!`,message.author.displayAvatarURL)
.setDescription(`Tebrikler Kazandınız 🎉`)
.addField(`Kazanılan miktar: `, `${amount}`,true)
.addField(`İşte Slotlar; `,`${slot1} ${slot2} ${slot3}`,true)
.setColor("#ACF94F")
.setTimestamp()
let embed2 = new Discord.RichEmbed()
.setAuthor(`${user.tag} için slotlar çevriliyor!`,message.author.displayAvatarURL)
.setDescription(`Eyvah Kaybettiniz!`)
.addField(`İşte slotlar`,`${slot1} ${slot2} ${slot3}`,true)
.addField(`Kaybedilen miktar: `, `${args[0]}`,true)
.setColor("#39A50E")
.setTimestamp()

if(isNaN(args[0])) return message.channel.send(`${message.author}, bir para gir.`)
if(cuzdan < args[0] ) return message.channel.send(`${message.author}, yeterli miktarda paranız bulunmuyor.`)
if(slot1 === slot2 && slot1 === slot3)
{
message.channel.sendEmbed(embed)
db.add(`${user.id}.money`, amount)
}
else{
    db.subtract(`${user.id}.money`,args[0])
    message.channel.sendEmbed(embed2)
}
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['slot','s']
    
  };
  
  exports.help = {
    name: 'Slot',
    description: 'Slot çevirme komutu.',
    usage: 'Slot'
  };