const Discord = require('discord.js'); 
const db = require('quick.db')
exports.run = async (client, message, args) => {
let user = message.author;
let silineceksayi = args[0];
const ytsorgu = db.fetch(`${message.author.id}.yetki`)  
if(ytsorgu != 1) return message.channel.send(`${message.author}, üzgünüm bu komutu kullanabilmek için yetkili olmalısınız.`)
    if(!silineceksayi) return message.channel.send(`${message.author}, silmek istediğiniz adeti girin🧹 `)
    message.channel.bulkDelete(silineceksayi).then(() => {
        message.channel.send(`${message.author}, ${silineceksayi} adet mesaj uzaya uçuruldu🚀 `);
    })
    



}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sil','sik']
    
  };
  
  exports.help = {
    name: 'sil',
    description: 'Ping Pong',
    usage: 'sil'
  };