'use strict';

module.exports = {
  default: {
    settings: {
      debug: false,
    },
    queues: {
      // Example queue
      // queuename: {
      //   name: 'queuename',
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
  validator(/* config */) { },
};