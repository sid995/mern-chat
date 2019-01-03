import { AuthenticationError } from 'apollo-server-express'

const signedIn = req => req.session.userId

export const checkedSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in')
  }
}

export const checkedSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in')
  }
}
