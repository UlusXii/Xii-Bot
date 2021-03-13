const Discord = require('discord.js')
const db = require('quick.db')
exports.run = (client, message, args) => {
let user = message.author
let meslek = db.fetch(`${user.id}.meslek`)
let para = db.fetch(`${user.id}.money`)
let kayit_tarihi = db.fetch(`${user.id}.hesaptarihi`)
let level = db.fetch(`${user.id}.level`)
let xp = db.fetch(`${user.id}.xp`)
if(!meslek)
{
  let profil1 = new Discord.RichEmbed()
    .setAuthor(`${user.username} | Profil`)
    .setThumbnail(`${user.displayAvatarURL}`)
    .addField(`Kayıt tarihi:`, `${kayit_tarihi}`)
    .addField(`Mesleğiniz:`, `İşsiz.`)
    .addField(`Mevcut Paranız:`, `${para}`)
    .addField(`Seviyeniz :`, `${level}`)
    .addField(`Tebrüce Puanınız:`, `${xp}`)
    //.setDescription(`__Seviye atlamak için chat kanallarını aktif olarak kullanmalısınız.__`)        
    .setColor("#BFF125")
    .setFooter(`${user.tag}`,user.displayAvatarURL)
    .setTimestamp()
    message.channel.sendEmbed(profil1)
}

else
{
let profil = new Discord.RichEmbed()
    .setAuthor(`${user.username} | Profil`)
    .setThumbnail(`${user.displayAvatarURL}`)
    .addField(`Kayıt tarihi:`, `${kayit_tarihi}`)
    .addField(`Mesleğiniz:`, `${meslek}`)
    .addField(`Mevcut Paranız:`, `${para}`)
    .addField(`Seviyeniz :`, `${level}`)
    .addField(`Tebrüce Puanınız:`, `${xp}`)
    //.setDescription(`__Seviye atlamak için chat kanallarını aktif olarak kullanmalısınız.__`)        
    .setColor("#BFF125")
    .setFooter(`${user.tag}`,user.displayAvatarURL)
    .setTimestamp()
message.channel.sendEmbed(profil)
}
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['p','profilim']
    
  };
  
  exports.help = {
    name: 'Kullanıcı Profili',
    description: 'Kullanıcının profilini göstermeye yarayan komut..',
    usage: 'P & profilim'
  };