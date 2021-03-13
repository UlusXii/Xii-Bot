const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
    let user = message.author
    let etiket = message.mentions.members.first()
    const ytsorgu = db.fetch(`${message.author.id}.yetki`)  
    if(ytsorgu != 1) return message.channel.send(`${message.author}, üzgünüm bu komutu kullanabilmek için yetkili olmalısınız.`)
    
    if(!etiket){
        //if(isNaN(args[0]||args[1])) return message.reply("Bir değer girin.")
        if(!args[0]) return message.reply("bir değer girin.")
        let deger_isim = args[0];
        let deger = args[1];
        if(deger == "null"){
          db.set(`${user.id}.${deger_isim}`, null)
        let sonuc = db.fetch(`${user.id}.${deger_isim}`)
        message.channel.send(`${message.author},başarılı bir şekilde datayı değiştirdiniz.Sonuç : ${sonuc}`)
        }else{
        db.set(`${user.id}.${deger_isim}`, deger)
        let sonuc = db.fetch(`${user.id}.${deger_isim}`)
        message.channel.send(`${message.author},başarılı bir şekilde datayı değiştirdiniz.Sonuç : ${sonuc}`)
      }
    }
    if(etiket){
      if(!args[0]) return message.reply("bir değer girin.")
        let deger_isim = args[1];
        let deger = args[2];
        if(deger == "null"){
          db.set(`${etiket.id}.${deger_isim}`, null)
        let sonuc = db.fetch(`${etiket.id}.${deger_isim}`)
        message.channel.send(`${message.author},başarılı bir şekilde datayı değiştirdiniz.Sonuç : ${sonuc}`)
        }else{
        db.set(`${etiket.id}.${deger_isim}`, deger)
        let sonuc = db.fetch(`${etiket.id}.${deger_isim}`)
        message.channel.send(`${message.author},başarılı bir şekilde datayı değiştirdiniz.Sonuç : ${sonuc}`)
    }
    };
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kontrol','k']
    
  };
  
  exports.help = {
    name: 'Veri Kontrolü',
    description: 'Veri kontrol etme komutu.',
    usage: 'k & kontrol'
  };