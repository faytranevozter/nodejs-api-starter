const successResponse = (data, message = 'success') => {
  const response = {
    status: 200,
    message,
    validation: {},
    data
  }

  return response
}

const errorResponse = (status, message, validationErrors = {}) => {
  const response = {
    status,
    message,
    validation: validationErrors,
    data: {}
  }

  return response
}

const errorValidation = (validationErrors = {}, message = 'failed') => {
  return errorResponse(400, message, validationErrors)
}

module.exports = {
  errorResponse,
  successResponse,
  errorValidation
}
