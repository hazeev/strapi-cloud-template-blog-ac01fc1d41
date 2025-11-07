'use strict';

/**
 * maintenance-guide service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::maintenance-guide.maintenance-guide');
