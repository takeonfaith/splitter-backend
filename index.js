const TelegramBot = require("node-telegram-bot-api");
const imageToText = require("./image-to-text");
const whoOwnsWho = require("./who-owns-who");
require("dotenv").config();

const webAppUrl = 'https://lucent-empanada-a2cdd7.netlify.app/'
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

const getMessage = (data, result) => {
  const { payers } = data
  console.log(result);
  return `Кто платил: ${Object.keys(payers).map((name, index, arr) => name + ` (${payers[name]} руб.)`)}
  ${Object.keys(result).map((name) => {
    return result[name].map(el => {
      return `\n ${name} должен ${el.to} ${el.sum.toFixed(1)} руб. `
    })
  })}
  
  `
}

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text

  if (msg?.photo?.length) {
    console.log(msg?.photo?.length);

    const link = await bot.getFileLink(msg.photo[msg.photo.length - 1].file_id)

    console.log(imageToText(link));
  }

  if (message === '/start') {
    bot.sendMessage(chatId, "Received your message", {
      reply_markup: {
        keyboard: [[{
          text: 'Добавить контакт',
          web_app: { url: webAppUrl + 'add-contacts' }
        }, {
          text: 'Рассчитать чек',
          web_app: { url: webAppUrl + 'choose-contacts' }
        }]]
      }
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      console.log(data.list);
      await bot.sendMessage(chatId, getMessage(data, whoOwnsWho(data.payers, data.list)))
    } catch (error) {
      console.error(error);
    }
  }
});
