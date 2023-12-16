/*
 * Copyright (c) 2023. Leonardo Migliorelli <Glydric>
 */

import * as process from 'process';

function throwsIfNotDefined(value: any, message: string) {
  if (!value) {
    throw new Error(message + ' not Defined');
  }
}

export default () => {
  throwsIfNotDefined(
    process.env.MONGO_INITDB_ROOT_USERNAME,
    'MONGO_INITDB_ROOT_USERNAME',
  );
  throwsIfNotDefined(
    process.env.MONGO_INITDB_ROOT_PASSWORD,
    'MONGO_INITDB_ROOT_PASSWORD',
  );
  throwsIfNotDefined(process.env.JWT_SECRET, 'JWT_SECRET');
  throwsIfNotDefined(process.env.CSD_USER, 'CSD_USER');
  throwsIfNotDefined(process.env.CSD_PASSWORD, 'CSD_PASSWORD');
  throwsIfNotDefined(process.env.TELEGRAM_TOKEN, 'TELEGRAM_TOKEN');
  throwsIfNotDefined(process.env.MONGO_HOST, 'MONGO_HOST');
  throwsIfNotDefined(process.env.BCRYPT_SALT, 'BCRYPT_SALT');
};
