const Joi = require("joi");
const {emailRegexp} = require('../helpers/regExp');
const subscription = require('../helpers/subscriprion');

const register = Joi.object({
    // name: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription:Joi.string().valid(...subscription),
});

const login = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const subscriprion = Joi.object({
    subscription:Joi.string().valid(...subscription).required(),
});

const reVerifyReq = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

module.exports = {
    register,
    login,
    subscriprion,
    reVerifyReq
}