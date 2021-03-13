const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
    let user = message.author
    let hedefkullanici = message.mentions.members.first()
    
    const ytsorgu = db.fetch(`${message.author.id}.yetki`)  
    if(ytsorgu != 1) return message.channel.send(`${message.author}, üzgünüm bu komutu kullanabilmek için yetkili olmalısınız.`)
    if(hedefkullanici){    
    
      //if(isNaN(args[0]||args[1])) return message.reply("Bir değer girin.")
      let kayit1 = db.fetch(`${hedefkullanici.id}.kayit`)
      let money1 = db.fetch(`${hedefkullanici.id}.money`)
      let meslek1 = db.fetch(`${hedefkullanici.id}.meslek`)
      let hesaptarihi1 = db.fetch(`${hedefkullanici.id}.hesaptarihi`)
      let yetki1 = db.fetch(`${hedefkullanici.id}.yetki`)
      
      message.channel.sendEmbed(
        new Discord.RichEmbed()
        .setDescription(`**${hedefkullanici.user.tag}** hakkında istediğiniz veriler;`)
        .addField(`Kayıt`, kayit1,true)
        .addField(`Para`, money1,true)
        .addField(`Meslek`, meslek1,true)
        .addField(`Kayıt Tarihi`,hesaptarihi1,true)
        .addField(`Yetki`,yetki1,true)
        .setThumbnail(`${hedefkullanici.user.displayAvatarURL}`)
        .setTimestamp()
        //.setThumbnail(`${hedefkullanici.avatarURL}`)
        .setColor("GREEN")
      )
  }
    else{    
    
        //if(isNaN(args[0]||args[1])) return message.reply("Bir değer girin.")
    let kayit = db.fetch(`${user.id}.kayit`)
    let money = db.fetch(`${user.id}.money`)
    let meslek = db.fetch(`${user.id}.meslek`)
    let hesaptarihi = db.fetch(`${user.id}.hesaptarihi`)
    let yetki = db.fetch(`${user.id}.yetki`)
    let profil = [kayit,money,meslek,hesaptarihi,yetki]
    message.channel.sendEmbed(
      new Discord.RichEmbed()
      .setDescription(`**${user.tag}** hakkında istediğiniz veriler;`)
      .addField(`Kayıt`, kayit,true)
      .addField(`Para`, money,true)
      .addField(`Meslek`, meslek,true)
      .addField(`Kayıt Tarihi`,hesaptarihi,true)
      .addField(`Yetki`,yetki,true)
      
      .setTimestamp()
      .setThumbnail(`${user.displayAvatarURL}`)
      .setColor("GREEN")
    )
    }
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['goster','g']
    
  };
  
  exports.help = {
    name: 'Veri Gösterme',
    description: 'Veri gösterme komutu.',
    usage: 'g & goster'
  };