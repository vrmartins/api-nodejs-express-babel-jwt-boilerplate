import TenantModel from '../models/tenant'

const TenantController = {
  get: async (request, response, next) => {
    // TODO: Criar filtro para que o usuário logado consiga listar apenas
    // os tenants que ele possui acesso
    try {
      response.json(await TenantModel.find({}))
    } catch (error) {
      next(error)
    }
  },

  post: async ({ body }, response, next) => {
    // TODO: Incluir o tenant criado nos acessos do usuário
    const tenant = TenantModel(body)
    try {
      response.json(await tenant.save())
    } catch (error) {
      next(error)
    }
  }
}

export default TenantController
