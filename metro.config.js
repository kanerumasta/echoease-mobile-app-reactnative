const { getDefaultConfig } = require("expo/metro-config");
console.log('BACKEND_URL: ',process.env.BACKEND_URL)
console.log('NOTIFICATION_SOCKET: ',process.env.NOTIFICATION_SOCKET)
console.log('CHAT_SOCKET: ',process.env.CHAT_SOCKET)


// BACKEND_URL=http://192.168.1.242:8000
// NOTIFICATION_SOCKET=ws://192.168.1.242:8000/ws/notification/
// CHAT_SOCKET=ws://192.168.1.242:8000/ws/chat

const config = getDefaultConfig(__dirname);

module.exports = config;
