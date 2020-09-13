import Logger from '../config/logger.js';

const logger = Logger('Validate helper');

const validateStringField = (field, nameField) => {
  if (!field || typeof field !== 'string' || field === '') {
    logger.error(`${nameField} is required or must be a string`);
    const error = {
      code: 422,
      message: `${nameField} is required or must be a string`,
    };
    throw error;
  }
};

const validateNumberField = (field, nameField) => {
  if (!field || typeof field !== 'number' || field === '') {
    logger.error(`${nameField} is required or must be a string`);
    const error = {
      code: 422,
      message: `${nameField} is required or must be a number`,
    };
    throw error;
  }
};

export { validateStringField, validateNumberField };
