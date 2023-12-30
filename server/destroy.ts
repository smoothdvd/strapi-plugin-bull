import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  // destroy phase
  Object.keys(strapi.bull.queues).forEach((name) => {
    strapi.log.info('Cleaning up Bull queues...');
    strapi.bull.queues[name].close();
  });
};
