import PersonModel from '../models/person'

const PersonController = {
  get: async ({ payload }, response, next) => {
    try {
      const BoundPersonModel = PersonModel.byTenant(payload.tenantId)
      response.json(await BoundPersonModel.find({}))
    } catch (error) {
      next(error)
    }
  },

  post: async ({ body, payload }, response, next) => {
    try {
      const BoundPersonModel = PersonModel.byTenant(payload.tenantId)
      const person = new BoundPersonModel({
        ...body,
        tenantId: BoundPersonModel.getTenantId()
      })
      response.json(await person.save())
    } catch (error) {
      next(error)
    }
  }
}

export default PersonController
