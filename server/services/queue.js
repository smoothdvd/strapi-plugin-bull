'use strict';

const Bull = require('bull');
const chalk = require('chalk');
const debug = require('debug')('strapi:strapi-plugin-bull');

module.exports = ({ strapi }) => ({
  buildAll(config) {
    const coreConfig = config

    Object.keys(coreConfig.queues).forEach((name) => {
      debug(`${chalk.yellow('Building')} ${name} queue`);
      const nameConfig = coreConfig.queues[name];
      try {
        strapi.bull.queues[name] = new Bull(name, nameConfig.redis);
        debug(`${chalk.green('Built')} ${name} queue`);
      } catch (e) {
        debug(`${chalk.red('Failed to build')} ${name} queue`);
      }
      try {
        if (nameConfig.process) {
          strapi.bull.queues[name].process(
            nameConfig.process.name,
            nameConfig.process.concurrency,
            nameConfig.process.processor({ strapi }).process
          );
          debug(`${chalk.green('Created')} ${name} queue ${nameConfig.process.name} processor`);
        }
      } catch (e) {
        debug(`${chalk.red('Failed to create')} ${name} queue ${nameConfig.process.name} processor`);
      }
    });
  },
});