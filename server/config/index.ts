export interface BullConfig {
    redis: {
      host?: string;
      port: number;
      db?: number;
      username?: string;
      password?: string;
    };
    settings: {
      debug: boolean;
    };
  queues: {
    [key: string]: {
      name: string;
      redis: {
        host?: string;
        port: number;
        db?: number;
        username?: string;
        password?: string;
      };
      process: {
        name: string;
        concurrency: number;
        processor: ({ strapi }: { strapi: any }) => {
          process(job: any): Promise<void>;
        };
      };
    };
  };
}

export default {
  default: {
    redis: {
      host: 'localhost',
      port: 6379,
      db: 0,
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
  validator() {},
};
