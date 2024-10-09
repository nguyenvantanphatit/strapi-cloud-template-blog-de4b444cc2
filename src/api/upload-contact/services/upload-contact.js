'use strict';

/**
 * upload-contact service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::upload-contact.upload-contact');
