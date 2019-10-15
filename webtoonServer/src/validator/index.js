const { validate } = require("joi");

module.exports = (request, validationSchema) => {
    const valid = validate(request, validationSchema);
    if (valid.error) throw new Error("Schema Wrond");
    return valid;
};
