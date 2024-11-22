const { getDefaultConfig } = require("expo/metro-config");
console.log('BACKEND_URL: ',process.env.BACKEND_URL)
console.log('NOTIFICATION_SOCKET: ',process.env.NOTIFICATION_SOCKET)
console.log('CHAT_SOCKET: ',process.env.CHAT_SOCKET)


const config = getDefaultConfig(__dirname);

module.exports = config;
