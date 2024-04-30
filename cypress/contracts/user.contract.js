const user = require ('user')

const usersSchema = user.object({
    produtos: user.array().items({
        nome: user.string(),
        email: user.string(),
        password: user.string(),
        administrador: user.string()
    })
})
export default userSchema;