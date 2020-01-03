var Joi=require('@hapi/joi');
var Schema = Joi.object().keys({
    field0: Joi.any(),
    field1: Joi.any(),
    field2: Joi.any(),
    field3: Joi.any(),
    field4: Joi.any(),
    field5: Joi.any(),
    field6: Joi.any(),
    field7: Joi.any()
})
module.exports=Schema