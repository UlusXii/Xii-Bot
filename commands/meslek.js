const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    const tl = client.emojis.find(emoji => emoji.name === "tl");
    let user = message.author
    let meslek_sorgu = db.fetch(`${user.id}.meslek`)
    let secilen_meslek = args[0]
    let userlevel = db.fetch(`${user.id}.level`)
    let meslekler = new Discord.RichEmbed()
    .setAuthor(`Meslekler`,message.author.displayAvatarURL)
    .addField(`🎣 Balıkçı | Gereken seviye : 1`, `Saatlik gelir : 10${tl}`)
    .addField(`🚕 Taksici | Gereken seviye : 3`,`Saatlik gelir : 15${tl}`)
    .addField(`🪓 Oduncu | Gereken seviye : 5`,`Günlük gelir : 400${tl}`)
    .addField(`⛏ Madenci | Gereken seviye : 7`,`Günlük gelir : 600${tl}`)
    .setDescription(`__Seviye atlamak için chat kanallarını aktif olarak kullanmalısınız.__`)        
    .setColor("#BFF125")
    .setTimestamp()
    let balıkçı = new Discord.RichEmbed()
    .setAuthor(`Meslekler`,message.author.displayAvatarURL)
    .addField(`🎣 Balıkçı | Gereken seviye : 1`, `Saatlik gelir : 10${tl}`)
    .setDescription(`Başarılı bir şekilde Balıkçı mesleğine kayıt oldunuz.`)        
    .setColor("#257CF1")
    .setTimestamp()
    let taksici = new Discord.RichEmbed()
    .setAuthor(`Meslekler`,message.author.displayAvatarURL)
    .addField(`🚕 Taksici | Gereken seviye : 3`,`Saatlik gelir : 15${tl}`)
    .setDescription(`Başarılı bir şekilde Taksici mesleğine kayıt oldunuz.`)        
    .setColor("#F1EA0A")
    .setTimestamp()
    let oduncu = new Discord.RichEmbed()
    .setAuthor(`Meslekler`,message.author.displayAvatarURL)
    .addField(`🪓 Oduncu | Gereken seviye : 5`,`Günlük gelir : 400${tl}`)
    .setDescription(`Başarılı bir şekilde Oduncu mesleğine kayıt oldunuz.`)        
    .setColor("#F1880A")
    .setTimestamp()
    let madenci = new Discord.RichEmbed()
    .setAuthor(`Meslekler`,message.author.displayAvatarURL)
    .addField(`⛏ Madenci | Gereken seviye : 7`,`Günlük gelir : 600${tl}`)
    .setDescription(`Başarılı bir şekilde Madenci mesleğine kayıt oldunuz.`)        
    .setColor("#9A9A91")
    .setTimestamp()
    
    if(!secilen_meslek) return message.channel.sendEmbed(meslekler)
    
    if(secilen_meslek)
    {
      if(!meslek_sorgu){
      if(secilen_meslek === "balıkçı")
      {
        message.channel.sendEmbed(balıkçı)
        db.set(`${user.id}.meslek`, "Balıkçı")
      }
      
      if(secilen_meslek === "taksici")
      {
        if(userlevel >= 3) {
        message.channel.sendEmbed(taksici)
        db.set(`${user.id}.meslek`, "Taksici")
        }
        else return message.channel.send(`${user}, bu mesleği yapabilmek için 3. Seviyeye ulaşman gerekiyor.`);
      }
      if(secilen_meslek === "oduncu")
      {
        if(userlevel >= 5) {
        message.channel.sendEmbed(oduncu)
        db.set(`${user.id}.meslek`, "Oduncu")
      }
      else
        return message.channel.send(`${user}, bu mesleği yapabilmek için 5. Seviyeye ulaşman gerekiyor.`);
      
      }
      if(secilen_meslek === "madenci")
      {
        if(userlevel >= 7) {
        message.channel.sendEmbed(madenci)
        db.set(`${user.id}.meslek`, "Madenci")
      }
      }
      else return
        message.channel.send(`${user}, bu mesleği yapabilmek için 7. Seviyeye ulaşman gerekiyor.`);
      
    }
    
  }
    else{
      message.channel.sendEmbed(new Discord.RichEmbed()
      .setAuthor(`UYARI`,message.author.displayAvatarURL)
      .setDescription(`Bir işiniz bulunmakta. Başka bir meslek seçmek için işinizden ayrılın.`)        
      .setColor("#FF4343")
      .setTimestamp())
    }
    }
        

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['m','meslek']
    
  };
exports.help = {
    name: 'Meslek Seçimi',
    description: 'Meslek seçmek için kullanılan komut',
    usage: 'meslek'
  };