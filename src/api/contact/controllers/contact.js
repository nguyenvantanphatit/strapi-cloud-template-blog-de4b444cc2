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
      const { name, email, phone, message, status_contact, image } = ctx.request.body;
  
      if (!name || !email || !phone || !message) {
        return ctx.badRequest('Missing required fields');
      }
  
      const newContact = await strapi.entityService.create('api::contact.contact', {
        data: {
          name,
          email,
          phone,
          message,
          status_contact,
          image: image ? { id: image.id } : null 
        },
      });
  
      const sanitizedEntity = await this.sanitizeOutput(newContact, ctx);
      return this.transformResponse(sanitizedEntity);
  
    } catch (err) {
      strapi.log.error('Failed to create contact', err);
      return ctx.badRequest('Unable to create contact');
    }
  }
  
}));