const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "6899256383:AAGNrjp2Q1OMe4iWvsVqSIWxzBZ3Y4t29pk";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/fact/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios.get(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const fact = response.data;

    if (!fact || !fact.text) {
      bot.sendMessage(chatId, "Sorry, I could not fetch a fact at the moment.");
      return;
    }

    bot.sendMessage(chatId, fact.text);
  } catch (error) {
    console.error("Error fetching fact:", error);
    bot.sendMessage(chatId, "Sorry, I could not fetch a fact at the moment.");
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    bot.sendMessage(
      chatId,
      "Welcome to the Fact Bot! Send /fact to get a random fact."
    );
  }
});
