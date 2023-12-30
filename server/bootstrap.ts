import { Strapi } from '@strapi/strapi';
import debug from 'debug';

import { BullConfig } from './config';

declare module '@strapi/strapi' {
  interface Strapi {
    bull: {
      config: BullConfig;
      queues: {
        [key: string]: import('bull').Queue;
      };
    };
  }
}

export default async ({ strapi }: { strapi: Strapi }) => {
  // Load plugin Config
  const config = strapi.config.get<BullConfig>('plugin.strapi-plugin-bull');

  // Configure plugin debug
  if (config.settings.debug === true) {
    debug.enable('strapi:strapi-plugin-bull');
  }

  // Construct Bull API
  strapi.bull = {
    config,
    queues: undefined as unknown as Strapi['bull']['queues'],
  };

  // Build Bull queue
  await strapi.plugin('strapi-plugin-bull').service('queue').buildAll(config);

  // Construct Admin Permissions
  const actions = [
    {
      section: 'settings',
      category: 'Bull',
      displayName: 'Access the Bull Overview page',
      uid: 'settings.read',
      pluginName: 'strapi-plugin-bull',
    },
  ];
  await strapi.admin!.services.permission.actionProvider.registerMany(actions);
};
