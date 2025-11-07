'use strict';

/**
 * vehicle-resource service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vehicle-resource.vehicle-resource');
