const TelegramBot = require("node-telegram-bot-api");
const imageToText = require("./image-to-text");
const whoOwnsWho = require("./who-owns-who");
require("dotenv").config();

const webAppUrl = 'https://lucent-empanada-a2cdd7.netlify.app/'
const token = process.env.TOKEN;

// const tempData = {
//   "Костя": [
//     {
//       "product": {
//         "id": "39e12b4e-c078-4d5d-8550-bcc02ebf4bb3",
//         "name": "Пицца ",
//         "price": 1300,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "1302a935-a023-4086-a0df-36132e3feb61",
//         "name": "Вино",
//         "price": 800,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "88259ab4-f4cc-4f7b-ad20-edf6871f9d35",
//         "name": "Кола",
//         "price": 200,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     }
//   ],
//   "Леха": [
//     {
//       "product": {
//         "id": "39e12b4e-c078-4d5d-8550-bcc02ebf4bb3",
//         "name": "Пицца ",
//         "price": 1300,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "1302a935-a023-4086-a0df-36132e3feb61",
//         "name": "Вино",
//         "price": 800,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "88259ab4-f4cc-4f7b-ad20-edf6871f9d35",
//         "name": "Кола",
//         "price": 200,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     }
//   ],
//   "Оля": [
//     {
//       "product": {
//         "id": "39e12b4e-c078-4d5d-8550-bcc02ebf4bb3",
//         "name": "Пицца ",
//         "price": 1300,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "1302a935-a023-4086-a0df-36132e3feb61",
//         "name": "Вино",
//         "price": 800,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "88259ab4-f4cc-4f7b-ad20-edf6871f9d35",
//         "name": "Кола",
//         "price": 200,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     }
//   ],
//   "Тоха ": [
//     {
//       "product": {
//         "id": "39e12b4e-c078-4d5d-8550-bcc02ebf4bb3",
//         "name": "Пицца ",
//         "price": 1300,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "1302a935-a023-4086-a0df-36132e3feb61",
//         "name": "Вино",
//         "price": 800,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "88259ab4-f4cc-4f7b-ad20-edf6871f9d35",
//         "name": "Кола",
//         "price": 200,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     }
//   ],
//   "Влад": [
//     {
//       "product": {
//         "id": "39e12b4e-c078-4d5d-8550-bcc02ebf4bb3",
//         "name": "Пицца ",
//         "price": 1300,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "1302a935-a023-4086-a0df-36132e3feb61",
//         "name": "Вино",
//         "price": 800,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "88259ab4-f4cc-4f7b-ad20-edf6871f9d35",
//         "name": "Кола",
//         "price": 200,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     }
//   ],
//   "Саня": [
//     {
//       "product": {
//         "id": "39e12b4e-c078-4d5d-8550-bcc02ebf4bb3",
//         "name": "Пицца ",
//         "price": 1300,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "1302a935-a023-4086-a0df-36132e3feb61",
//         "name": "Вино",
//         "price": 800,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     },
//     {
//       "product": {
//         "id": "88259ab4-f4cc-4f7b-ad20-edf6871f9d35",
//         "name": "Кола",
//         "price": 200,
//         "quantity": 1
//       },
//       "proportion": 0.16666666666666666
//     }
//   ]
// }

// const tempPayers = {
//   Костя: 1300,
//   Леха: 800,
//   Оля: 200
// }

// console.log(whoOwnsWho(tempPayers, tempData));

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
  const { payers, billName } = data
  console.log(result);
  return `# ${billName}
Кто платил: ${Object.keys(payers).map((name, index, arr) => name + ` (${payers[name]} руб.)`)}
${Object.keys(result).map((name) => {
    return result[name].map(el => {
      return `\n${name} должен ${el.to} ${el.sum.toFixed(1)} руб. `
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
          web_app: { url: webAppUrl + 'bill-name' }
        }]]
      }
    });
  }

  if (msg?.web_app_data?.data) {
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      console.log(JSON.stringify(data.list));
      await bot.sendMessage(chatId, getMessage(data, whoOwnsWho(data.payers, data.list)), { parse_mode: 'Markdown' })
    } catch (error) {
      console.error(error);
    }
  }
});
