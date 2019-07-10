import { Schema, model } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const TenantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true
  }
}, {
  timestamps: true
})

TenantSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
})

export default model('Tenant', TenantSchema)
