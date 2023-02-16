'use strict';

module.exports = {
  default: {
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
      password: null,
    },
    settings: {
      debug: false,
    },
    queues: {
      // Example queue
      // queueName: {
      //   name: 'queueName',
      //   redis: {
      //     host: 'localhost',
      //     port: 6379,
      //     db: 0,
      //     password: null,
      //   },
      //   process: {
      //     name: 'processorName',
      //     concurrency: 1,
      //     processor() {},
      //   },
      // }
    },
  },
  validator(/* config */) {},
};
