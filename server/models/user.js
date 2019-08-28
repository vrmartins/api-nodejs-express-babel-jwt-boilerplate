import { Schema, model } from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    required: true,
    select: false
  },
  tenants: Array, // TODO: Array of tenants
  role: Object // TODO: Verify
}, {
  timestamps: true
})

UserSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
})

UserSchema.methods.toResponse = function () {
  return {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName
  }
}

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
}

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJWT = function () {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 30)

  return jwt.sign({
    email: this.email,
    id: this._id,
    tenantId: 'tenantId', // Alterar para o tenant logado
    tenants: this.tenants,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  }, process.env.AUTH_SECRET)
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email
  }
}

export default model('User', UserSchema)
