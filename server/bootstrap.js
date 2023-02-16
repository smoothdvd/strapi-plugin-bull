/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["strapi"] }] */

'use strict';

const debug = require('debug');

module.exports = async ({ strapi }) => {
  // Load plugin Config
  const config = strapi.config.get('plugin.strapi-plugin-bull');

  // Configure plugin debug
  if (config.settings.debug === true) {
    debug.enable('strapi:strapi-plugin-bull');
  }

  // Construct Bull API
  strapi.bull = {
    config,
    queues: {},
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
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
