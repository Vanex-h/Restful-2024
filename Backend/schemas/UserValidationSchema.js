const joi = require('joi');

const CreateUser = joi.object({
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
});

module.exports = {
    CreateUser,
}