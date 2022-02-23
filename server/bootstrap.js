'use strict';

const debug = require('debug')

module.exports = async ({ strapi }) => {
  // Load plugin Config
  const coreConfig = strapi.config.get('plugin.strapi-plugin-bull');

  // Configure plugin debug
  if (coreConfig.settings.debug === true) {
    debug.enable('strapi:strapi-plugin-bull')
  }

  // Construct Bull API
  strapi.bull = {
    config: coreConfig,
    queues: {},
  };

  // Build Bull queue
  await strapi.plugin('strapi-plugin-bull').service('queue').buildAll(coreConfig);

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
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};