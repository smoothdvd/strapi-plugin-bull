/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["strapi"] }] */

'use strict';

const Bull = require('bull');
const chalk = require('chalk');
const debug = require('debug')('strapi:strapi-plugin-bull');

module.exports = ({ strapi }) => ({
  buildAll(config) {
    // default redis config
    const {
      default: { redis = {} },
    } = config;

    Object.keys(config.queues).forEach((name) => {
      debug(`${chalk.yellow('Building')} ${name} queue`);
      const queueConfig = config.queues[name];
      try {
        strapi.bull.queues[name] = new Bull(name, { redis: { ...redis, ...queueConfig.redis } });
        debug(`${chalk.green('Built')} ${name} queue`);
      } catch (e) {
        debug(`${chalk.red('Failed to build')} ${name} queue`);
      }
      try {
        if (queueConfig.process) {
          strapi.bull.queues[name].process(
            queueConfig.process.name,
            queueConfig.process.concurrency,
            queueConfig.process.processor({ strapi }).process
          );
          debug(`${chalk.green('Created')} ${name} queue ${queueConfig.process.name} processor`);
        }
      } catch (e) {
        debug(
          `${chalk.red('Failed to create')} ${name} queue ${queueConfig.process.name} processor`
        );
      }
    });
  },
});
