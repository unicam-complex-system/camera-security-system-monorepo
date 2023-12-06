/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import * as process from 'process';

function throwsIfNull(value: any, message: string) {
  if (!value) {
    throw new Error(message);
  }
}

export default () => {
  throwsIfNull(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    'MONGO_INITDB_ROOT_USERNAME not defined',
  );
  throwsIfNull(
    process.env.MONGO_INITDB_ROOT_PASSWORD,
    'MONGO_INITDB_ROOT_PASSWORD not defined',
  );
  throwsIfNull(process.env.JWT_SECRET, 'JWT_SECRET not defined');
  throwsIfNull(process.env.CSD_USER, 'CSD_USER not defined');
  throwsIfNull(process.env.CSD_PASSWORD, 'CSD_PASSWORD not defined');
  throwsIfNull(process.env.TELEGRAM_TOKEN, 'TELEGRAM_TOKEN not defined');
  throwsIfNull(process.env.MONGO_HOST, 'MONGO_HOST not defined');
};
