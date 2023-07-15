const axios = require('axios');
const username = 'justmey4tui';
async function getLiveInfo() {
  const userResponse = await axios.get(`https://www.tiktok.com/node/share/user/@${username}`);
  const userId = userResponse.data.userData.userId;
  const liveResponse = await axios.get(`https://webcast.tiktok.com/webcast/live/query?user_ids=${userId}`);
  const liveInfo = liveResponse.data.liveInfo[0];
  return liveInfo || null;
}
module.exports = getLiveInfo;
