import { Telegraf } from 'telegraf'
import { Calendar } from './Calendar.js'
import 'dotenv/config' 

// create the bot
const bot = new Telegraf(process.env.CALENDAR_BOT_TOKEN);
bot.use(Telegraf.log())

// instantiate the calendar
const calendar = new Calendar(bot, {
	startWeekDay: 1,
	weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
	monthNames: [
		"Янв", "Фев", "Мар", "Апр", "Май", "Июн",
		"Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
	]
});

// listen for the selected date event
calendar.setDateListener((context, date) => context.reply(date));
// retreive the calendar HTML
bot.command("calendar", context => {

	const today = new Date();
	const minDate = new Date();
	minDate.setMonth(today.getMonth());
	const maxDate = new Date();
	maxDate.setMonth(today.getMonth() + 3);
	maxDate.setDate(today.getDate());

	context.reply("Выберите дату заезда и выезда:", calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar())
});

bot.command("start", context => {
	context.reply("Привет. Отправь команду: /calendar" )
});

bot.catch((err) => {
	console.log("Error in bot:", err);
});

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))