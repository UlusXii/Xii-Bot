const Discord = require('discord.js');

const client  = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const prefix = ayarlar.prefix;
const db = require('quick.db');
const moment = require('moment');
require("./util/eventLoader")(client);
client.on('ready', () => {
    console.log(`${client.user.tag} başarılı bir şekilde online oldu.`);
});
const fs = require('fs');
const message = require('./events/message');




// Commands Loader

const log = message => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
  };
  
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
      let props = require(`./commands/${f}`);
      log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  
  
  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  
  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./commands/${command}`);
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
  
  client.unload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./commands/${command}`)];
        let cmd = require(`./commands/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  client.on("message", async message => {
    if(message.author.bot) return;
    let kayitsorgu = db.fetch(`${message.author.id}.kayit`)
    if(kayitsorgu != 1) return;
    let user = message.author
    let xp = db.fetch(`${user.id}.xp`)
    let level = db.fetch(`${user.id}.level`)
    let gerekenxp = level * 100
    let odul = Math.floor(Math.random() * 100) + xp;

    if(xp == gerekenxp || xp >= gerekenxp){
    db.add(`${user.id}.level`,1)
    db.add(`${user.id}.money`,odul)
    message.channel.send(`${user},tebrikler seviye atladınız ve ödül olarak ${odul} lira kazandınız.`)
    db.set(`${user.id}.xp`,0)
    }else{
    let toadd = Math.floor(Math.random() * 3 + 3);
    db.add(`${message.author.id}.xp`, toadd)
   }
    })



client.on('ready', () => {
  let c = db.all();
  console.log(c);
  console.log(`serving ${client.users.size} users on ${client.guilds.size} servers.`)
 
  client.user.setStatus('idle',`${client.users.size} kişi ile birlikteyiz 🎈` ) 

});
client.on('message', message => {
  
let user = message.author;
let kayit = db.get(`${user.id}.kayit`);
if(kayit != 1){
  let today = new Date();
    let date = today.getDate() + '-' + (today.getMonth() + 1)  + '-' + today.getFullYear()  ;
    let time = + today.getHours() + ":" + today.getMinutes();

    let currentdate = `${date} ` + `${time}`
  if(message.author.bot) return;
  db.set(`${user.id}.kayit`, 1)
  db.set(`${user.id}.money`, 100);
  db.set(`${user.id}.meslek`, null)
  db.set(`${user.id}.hesaptarihi`, currentdate)
  db.set(`${user.id}.xp`,0)
  db.set(`${user.id}.level`,1)
 db.set(`${user.id}.yetki`,0)
 if(user.id == "648424230081265664"){
  db.set(`${user.id}.yetki`,1)
  }
  let cuzdan = db.fetch(`${user.id}.money`)
  message.channel.send(`${message.author}, merhabalar sizi sisteme kayıt ettim.Başlangıç paranız : ${cuzdan}`);
}
});



  
  client.login(ayarlar.token);
