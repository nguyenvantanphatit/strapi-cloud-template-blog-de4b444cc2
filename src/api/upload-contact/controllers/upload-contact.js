'use strict';

/**
 * upload-contact controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::upload-contact.upload-contact'), ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;
  
      const entity = await strapi.query('api::upload-contact.upload-contact').findOne({
        where: { slug },
        populate: { deep: 4 },
      });
  
      if (!entity) {
        return ctx.notFound('upload-contact not found');
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
          const { name, image } = ctx.request.body;
      
          if (!name || !image) {
            return ctx.badRequest('Missing required fields');
          }
      
          const newContact = await strapi.entityService.create('api::upload-contact.upload-contact', {
            data: {
              name,
              image,
            },
          });
      
          const sanitizedEntity = await this.sanitizeOutput(newContact, ctx);
          return this.transformResponse(sanitizedEntity);
      
        } catch (err) {
          // Ghi log lỗi nếu có
          strapi.log.error('Failed to create contact', err);
          return ctx.badRequest('Unable to create contact');
        }
      },
      
    
    });