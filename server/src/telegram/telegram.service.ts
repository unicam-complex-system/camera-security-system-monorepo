import { Injectable } from "@nestjs/common";
import * as TelegramBot from "node-telegram-bot-api";
import * as process from "process";
import { DatabaseService } from "../database/database.service";
import UserDTO from "../user.dto";

@Injectable()
export class TelegramService {
  bot: TelegramBot;

  constructor(private readonly databaseService: DatabaseService) {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    console.log("Telegram bot started");

    this.bot.onText(/\/user (.+)/, (m) => this.onLogin(m));
    this.bot.onText(/\/start/, (m) => this.welcome(m));
  }

  private async welcome(msg: TelegramBot.Message) {
    await this.bot.sendMessage(
      msg.chat.id,
      "Welcome to CSS bot\n" +
        "This bot was developed by Leonardo Migliorelli\n" +
        "Please login with '/user <name> <password>'",
    );
  }

  private async onLogin(msg: TelegramBot.Message) {
    // removes /start command and then format name and password
    const array = msg.text.substring(6).split(" ");
    const userData: UserDTO = {
      name: array[0],
      password: array[1],
    };

    try {
      await this.databaseService.checkUserAndUpdateTelegramId(
        msg.chat.id,
        userData,
      );
    } catch (e) {
      await this.bot.sendMessage(msg.chat.id, e.message);
      return;
    }

    await this.bot.sendMessage(
      msg.chat.id,
      `Your Telegram account has been successfully linked to the account ${userData.name}\n` +
        `from now on you will receive intrusion detection triggers on this chat\n` +
        `Remember that only one device at a time can be connected with your account'`,
    );
  }

  async sendIntrusionDetectionNotification(
    cameraId: number,
    date: Date,
    image: Buffer,
  ) {
    const users = await this.databaseService.getRawDataArray("users");

    users
      .map((user) => user.telegramId)
      .forEach((id) => {
        this.bot.sendPhoto(id, image, {
          caption: `Intrusion detected on Camera ${cameraId}\nTime: ${date.toUTCString()}`,
        });
      });
  }
}
