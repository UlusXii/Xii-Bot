const ayarlar = require('../ayarlar.json');

module.exports = message => {
  
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let user = message.author
  let kayitsorgu =  db.fetch(`${user.id}.kayit`)
  if(!kayitsorgu) return message.channel.send(`${user}, `+"Bu komutu kullanabilmek için **kayıt olmalısın**. `.kayit` ")
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);

  let cmd; 
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    
    cmd.run(client, message, params);
  }

};


const db = require('quick.db');

module.exports = async message => {

  let client = message.client;
  let prefix = await ayarlar.prefix  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let user = message.author
  let kayitsorgu =  db.fetch(`${user.id}.kayit`)
  if(!kayitsorgu) return message.channel.send(`${user}, `+"Bu komutu kullanabilmek için **kayıt olmalısın**. `.kayit` ")
  let command = message.content.split(' ')[0].slice(prefix.length)
  let params = message.content.split(' ').slice(1)
  
  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  
  let kanal = await db.fetch(`botuncalismamakanali_${message.channel.id}`)
  if (kanal == null) {
  if (cmd) {
    
    cmd.run(client, message, params);
  }
  }
  
  if (kanal == 'calismiyor') {
    if (cmd.help.name == `çalışmakanal`) {
    cmd.run(client, message, params)
    return;
  }
    if (cmd) return;
  }
};