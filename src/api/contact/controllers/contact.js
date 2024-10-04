'use strict';

/**
 * contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contact.contact', ({ strapi }) => ({
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.query('api::contact.contact').findOne({
      where: { slug },
      populate: { deep: 4 },
    });

    if (!entity) {
      return ctx.notFound('Contact not found');
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    meta.date = Date.now();

    return { data, meta };
  },
  
  async create(ctx) {
    try {
      const { name, email, phone, message, status_contact } = ctx.request.body;

      const newContact = await strapi.query('api::contact.contact').create({
        data: {
          name,
          email,
          phone,
          message,
          status_contact,
        },
      });

      const sanitizedEntity = await this.sanitizeOutput(newContact, ctx);

      return this.transformResponse(sanitizedEntity);
    } catch (err) {
      strapi.log.error('Failed to create contact', err);
      return ctx.badRequest('Unable to create contact');
    }
  },
}));