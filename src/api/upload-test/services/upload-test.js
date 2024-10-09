'use strict';

/**
 * upload-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::upload-test.upload-test');
