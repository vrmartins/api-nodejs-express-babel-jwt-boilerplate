import UserModel from '../models/user'
import logger from '../logger'

const AuthController = {
  authenticate: async ({ body: { email, password } }, response, next) => {
    try {
      const user = await UserModel.findOne({ email }).select('+salt +hash +confirmationCode')

      if (!user) {
        logger.warn(`Usuário com email [${email}] não foi encontrado`)
        return response.status(401).json({
          'error.errors.email.message': 'Usuário não encontrado'
        })
      }

      if (!user.confirmationCode) {
        logger.warn(`Usuário com id [${user._id}] e email [${email}] não está confirmado`)
        return response.status(401).json({
          'error.errors.email.message': 'Usuário não foi confirmado'
        })
      }

      if (!user.validatePassword(password)) {
        logger.warn(`Tentativa de autenticação negada por senha inválida para usuário com id [${user._id}] e email [${email}]`)
        return response.status(401).json({
          'error.errors.email.password': 'Senha inválida'
        })
      }

      logger.info(`Usuário com id [${user._id}] e email [${email}] autenticado`)

      return response.json({
        token: user.generateJWT()
      })
    } catch (error) {
      logger.error(`Erro na autenticação do usuário com email [${email}]: ${error.message}`)
      next(error)
    }
  }
}

export default AuthController
