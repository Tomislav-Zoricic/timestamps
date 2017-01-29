'use strict'

const ERROR_TYPE = 'danger'
const SUCCESS_TYPE = 'success'
const INFO_TYPE = 'info'

const types = {
  error: ERROR_TYPE,
  success: SUCCESS_TYPE,
  info: INFO_TYPE
}

// Authentication
const authFailed = {
  message: 'Authentication failed',
  type: ERROR_TYPE
}

const invalidEmail = {
  message: 'Invalid email format',
  type: ERROR_TYPE
}

const emptyForm = {
  message: 'Some form inputs are empty',
  type: ERROR_TYPE
}

const passwordsMismatch = {
  message: 'Passwords do not match',
  type: ERROR_TYPE
}

const emailTaken = {
  message: 'Email is already in use',
  type: ERROR_TYPE
}

const incorrectPassword = {
  message: 'Password is too weak',
  type: ERROR_TYPE
}

const loginFailed = {
  message: 'Login failed. Make sure you have correct email and password',
  type: ERROR_TYPE
}

const logoutSuccess = {
  message: 'Successful logout',
  type: SUCCESS_TYPE
}

const savedChangesSuccess = {
  message: 'Changes saved successfuly',
  type: SUCCESS_TYPE
}

const savedChangesError = {
  message: 'Something went wrong, please try again',
  type: ERROR_TYPE
}

const saveByClickingEnter = {
  message: 'Save your changes by clicking enter',
  type: INFO_TYPE
}

export {
  types,

  // Authentication messages
  authFailed,
  invalidEmail,
  emptyForm,
  passwordsMismatch,
  emailTaken,
  incorrectPassword,
  loginFailed,
  logoutSuccess,

  savedChangesSuccess,
  savedChangesError,
  saveByClickingEnter
}
