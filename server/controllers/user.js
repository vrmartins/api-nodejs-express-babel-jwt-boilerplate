import UserModel from '../models/user'
import sendWelcomeEmail from '../utils/sendWelcomeEmail'
import { ResourceNotFound } from '../errors/ResourceNotFound'

const UserController = {
  // TODO: Garantir que apenas usuários autenticados recebam retorno nesse endpoint
  // TODO: Garantir que serão listados apenas usuários dos tenants do usuário logado
  get: async (req, res, next) => {
    console.log(req.payload)
    try {
      res.status(200).json(await UserModel.find({}))
    } catch (error) {
      next(error)
    }
  },

  post: async (req, res, next) => {
    const user = req.body
    const finalUser = new UserModel(user)

    try {
      finalUser.setPassword(user.password)
      finalUser.setConfirmationCode()
      await finalUser.save()
      res.json({ user: finalUser.toAuthJSON() })

      // TODO: O e-mail deve apresentar o link e mensagem de ativação apenas se o usuário escolheu
      // autenticar por email ao invés do login social
      // TODO: O login deve bater no frontend, este por sua vez deve bater no post de activate
      // TODO: Criar o endpoint de reenvio do link de ativação
      // TODO: Criar endpoint para recuperação de senha
      sendWelcomeEmail(finalUser)
    } catch (error) {
      next(error)
    }
  },

  activate: async ({ params }, res, next) => {
    try {
      const updateResult = await UserModel.updateOne({
        confirmationCode: params.confirmationCode,
        confirmed: false
      }, {
        $set: { confirmed: true }
      })

      if (updateResult.nModified === 0) throw new ResourceNotFound()

      const user = await UserModel.findOne({
        confirmationCode: params.confirmationCode,
        confirmed: true
      })

      if (!user) throw new ResourceNotFound()

      res.json(user.toAuthJSON())
    } catch (error) {
      next(error)
    }
  },

  put: async ({ params, body: { password, ...body } }, res, next) => {
    console.log('params ===>', params)
    console.log('password ===>', password)
    console.log('body ===>', body)
    try {
      const user = await UserModel.findById(params.id)
      if (password) user.setPassword(password)
      const finalUser = await user.updateOne(params.id, {
        $set: body
      })
      res.json({ user: finalUser.toResponse() })
    } catch (error) {
      console.log(error.message)
      next(error)
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params.id)
      res.json({ user: user.toResponse() })
    } catch (error) {
      next(error)
    }
  },

  deleteById: (req, res) => {
    res
      .status(200)
      .json(req.param)
  }
}

export default UserController
