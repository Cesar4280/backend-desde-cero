const { IncomingWebhook } = require("@slack/webhook");

const webHook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

const loggerStream = { write: async message => await webHook.send({ text: message }) };

module.exports = loggerStream;