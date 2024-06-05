import { authErrors, authErrorMessages } from './auth';
import { patientErrors, patientErrorMessages } from './patient';
import { userErrors, userErrorMessages } from './user';
import { doctorErrors, doctorErrorMessages } from './doctor';

export const ErrorsCodes = {
  ...authErrors,
  ...userErrors,
  ...patientErrors,
  ...doctorErrors,
};

export const ErrorMessages = {
  ...authErrorMessages,
  ...userErrorMessages,
  ...patientErrorMessages,
  ...doctorErrorMessages,
};
