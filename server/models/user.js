import {Schema, model} from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  tenants: Array, // TODO: Array of tenants
  role: Object, // TODO: Verify
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
      .toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
};

export default model('User', UserSchema);
