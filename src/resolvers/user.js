import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-core'
import Joi from 'joi'
import { signUp } from '../schemas/index'
import * as Auth from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      // TODO: projection
      Auth.checkSignedIn(req)

      return User.findById(req.session.userId)
    },
    users: (root, arg, { req }, info) => {
      // TODO: authenticated, projection, pagination, sanitization
      Auth.checkSignedIn(req)
      return User.find({})
    },
    user: (root, { id }, { req }, info) => {
      // TODO: auth, projection, sanitization

      Auth.checkSignedIn(req)

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // TODO: not auth
      Auth.checkSignedOut()
      await Joi.validate(args, signUp, { abortEarly: false })
      // validation
      return User.create(args)
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session

      if (userId) {
        return User.findById(userId)
      }

      Joi.validate(args, schema)

      return user
    },
    signOut: (root, args, { req }, info) => {}
  }
}
