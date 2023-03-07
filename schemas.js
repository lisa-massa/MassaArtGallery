const Joi = require('joi');

module.exports.artworkSchema =
    Joi.object({
        artwork: Joi.object({
            title: Joi.string().required(),
            year: Joi.number().required().min(2014),
            // image: Joi.string().required(),
            description: Joi.string().required()
        }).required()
    });