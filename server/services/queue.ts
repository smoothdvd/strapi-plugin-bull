import { Strapi } from '@strapi/strapi';

import Bull from 'bull';
import chalk from 'chalk';
import debugModule from 'debug';
import { BullConfig } from '../config';

const debug = debugModule('strapi:strapi-plugin-bull');

export default ({ strapi }: { strapi: Strapi }) => ({
  buildAll(config: BullConfig) {
    // default redis config
    const { redis } = config;

    // construct Bull API
    if (Object.keys(config.queues).length === 0) {
      // create the default queue
      try {
        strapi.bull.queues = {
          default: new Bull('default', { redis }),
        };
        debug(`${chalk.green('Built')} defalut queue`);
      } catch (error) {
        debug(`${error}`);
        debug(`${chalk.red('Failed to build')} default queue`);
      }
    }

    Object.keys(config.queues).forEach((name) => {
      debug(`${chalk.yellow('Building')} ${name} queue`);
      const queueConfig = config.queues[name];
      try {
        strapi.bull.queues = {
          ...strapi.bull.queues,
          [name]: new Bull(name, {
            redis: queueConfig.redis ? queueConfig.redis : redis,
          }),
        };
        debug(`${chalk.green('Built')} ${name} queue`);
      } catch (e) {
        debug(`${chalk.red('Failed to build')} ${name} queue`);
      }

      if (queueConfig.processes) {
        queueConfig.processes.map((process) => {
          try {
            strapi.bull.queues[name].process(
              process.name,
              process.concurrency,
              process.processor({ strapi }).process as Bull.ProcessCallbackFunction<any>
            );
            debug(`${chalk.green('Created')} ${name} queue ${process.name} processor`);
          } catch (e) {
            debug(`${chalk.red('Failed to create')} ${name} queue ${process.name} processor`);
          }
        });
      }
    });
  },
});
