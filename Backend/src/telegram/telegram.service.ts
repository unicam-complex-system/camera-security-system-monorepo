/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import * as process from 'process';
import { DatabaseService } from '../database/database.service';
import UserDTO from '../user.dto';

@Injectable()
export class TelegramService {
  bot: TelegramBot;

  constructor(private readonly databaseService: DatabaseService) {
    this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

    this.bot.onText(/\/user (.+)/, (m) => this.onLogin(m));
    this.bot.onText(/\/start/, (m) => this.welcome(m));
    this.bot.onText(/\/disable/, (m) => this.setIntrusionDetection(m, false));
    this.bot.onText(/\/enable/, (m) => this.setIntrusionDetection(m, true));
  }

  private async welcome(msg: TelegramBot.Message) {
    await this.bot.sendMessage(
      msg.chat.id,
      'Welcome to CSS bot\n' +
        'This bot was developed by Leonardo Migliorelli\n' +
        "Please login with '/user <name> <password>'\n" +
        "To disable intrusion detection, type '/disable'" +
        "To reenable intrusion detection, type '/enable'",
    );
  }

  private async onLogin(msg: TelegramBot.Message) {
    // removes /start command and then format name and password
    const array = msg.text.substring(6).split(' ');
    const userData: UserDTO = {
      name: array[0],
      password: array[1],
    };

    try {
      await this.databaseService.checkAndUpdateUser(userData, {
        telegramId: msg.chat.id,
      });

      // await this.databaseService.checkUserAndUpdateTelegramId(
      //   msg.chat.id,
      //   userData,
      // );
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

  private async setIntrusionDetection(
    msg: TelegramBot.Message,
    status: boolean,
  ) {
    try {
      await this.databaseService.checkAndUpdateUser(
        { telegramId: msg.chat.id },
        { getsAlerts: status },
      );
    } catch (e) {
      await this.bot.sendMessage(
        msg.chat.id,
        e == NotFoundException ? 'You are not logged in' : e.message,
      );
      return;
    }
    await this.bot.sendMessage(
      msg.chat.id,
      `Intrusion detection ${status ? 'enabled' : 'disabled'}`,
    );
    return;
  }

  async sendIntrusionDetectionNotification(
    cameraId: number,
    date: Date,
    image: Buffer,
  ) {
    const users = await this.databaseService.getRawDataArray('users');

    // TODO test filter
    users
      .filter((user) => user.getsAlerts)
      .map((user) => user.telegramId)
      .forEach((id) => {
        this.bot.sendPhoto(id, image, {
          caption: `Intrusion detected on Camera ${cameraId}\nTime: ${date.toUTCString()}`,
        });
      });
  }
}
