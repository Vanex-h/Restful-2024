const joi = require("joi");
const CreateBook = joi
  .object({
    name: joi.string().required().min(3),
    author: joi.string().required().min(3),
    publisher: joi.string().required().min(3),
    publicationYear: joi.string().required().min(4),
    subject: joi.string().required().min(3),
  })
  .options({ abortEarly: false, allowUnknown: true });
module.exports = {
  CreateBook,
};
