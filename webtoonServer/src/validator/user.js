const Joi = require("joi");

module.exports = {
    loginSchema: Joi.object()
        .keys({
            email: Joi.string()
                .email({ minDomainAtoms: 2 })
                .lowercase()
                .required(),
            password: Joi.string()
                .lowercase()
                .min(6)
                .required()
        })
        .options({ stripUnknown: true }),

    registerSchema: Joi.object()
        .keys({
            email: Joi.string()
                .email({ minDomainAtoms: 2 })
                .lowercase()
                .required(),
            password: Joi.string()
                .lowercase()
                .min(6)
                .required(),
            username: Joi.string()
                .trim()
                .lowercase()
                .min(6)
                .required()
        })
        .options({ stripUnknown: true })
};
