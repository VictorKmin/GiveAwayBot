const telegramBot = require('node-telegram-bot-api');
const API_KEY = require('./config/bot').API_KEY;
const bot = new telegramBot(API_KEY, {polling: true});
const dataBase = require('./dataBase').getInstance();

try {


    bot.on('message', async (msg) => {

        const CarModel = dataBase.getModel('Car');

        const cars = await CarModel.findAll({});
        cars.forEach(car => {
            console.log(car.dataValues);
        })

        bot.sendMessage(msg.chat.id, 'Hi, what is your name', {
            reply_markup: {
                keyboard: [['DIMAS'], ['Victor']]
            }
        });
    });


} catch (e) {
    console.log(e.message);
}
