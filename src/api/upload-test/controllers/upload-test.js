'use strict';

/**
 * upload-test controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::upload-test.upload-test');
