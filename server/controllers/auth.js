import UserModel from '../models/user'

const AuthController = {
  authenticate: async ({ body: { email, password } }, response, next) => {
    try {
      const user = await UserModel.findOne({ email }).select('+salt +hash')

      if (!user) {
        return response.status(401).json({
          'error.errors.email.message': 'Usuário não encontrado'
        })
      }

      console.log('here', email, password, user)

      if (!user.validatePassword(password)) {
        return response.status(401).json({
          'error.errors.email.password': 'Senha inválida'
        })
      }

      return response.json({
        token: user.generateJWT()
      })
    } catch (error) {
      console.log(error.message)
      next(error)
    }
  }
}

export default AuthController
