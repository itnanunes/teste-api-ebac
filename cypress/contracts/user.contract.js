const Joi = require ('joi')

const userSchema = Joi.object({
    quantidade: Joi.number(),
    usuarios: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string(),
        preco: Joi.number(),
        password: Joi.string(),
        administrador: Joi.string(),
        _id: Joi.string()
    })
})
export default userSchema;