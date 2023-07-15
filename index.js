const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const botconfig = require('./botconfig.json');
const username = 'justmey4tui';
const getLiveInfo = require('./tiktok.js');
let isLive = false;
const channelId = '1041699991053406282';
async function sendNotification(liveInfo) {
  const channel = client.channels.cache.get(channelId);
  if (!channel) return;
  const embed = new MessageEmbed()
    .setTitle(`@${username} is live on TikTok!`)
    .setDescription(liveInfo.title)
    .setImage(liveInfo.cover)
    .setURL(liveInfo.webcastUrl);
  await channel.send(embed);
}
async function checkLiveStatus() {
  const liveInfo = await getLiveInfo();
  if (liveInfo && !isLive) {
    isLive = true;
    await sendNotification(liveInfo);
  }
  if (!liveInfo && isLive) {
    isLive = false;
  }
}
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setInterval(checkLiveStatus, 10000);
});
client.login(botconfig.token);
    