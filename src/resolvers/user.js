import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-core'

export default {
  Query: {
    users: (root, arg, context, info) => {
      // TODO: authenticated, projection, pagination, sanitization

      return User.find({})
    },
    user: (root, { id }, context, info) => {
      // TODO: auth, projection, sanitization
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid user ID`)
      }

      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (root, args, context, info) => {
      // TODO: not auth

      // validation

      return User.create(args)
    }
  }
}
