// email regex was optained from: https://stackoverflow.com/questions/46370725/how-to-do-email-validation-using-regular-expression-in-typescript

import {
  EmailValidity,
  PasswordValidity,
  UsernameValidity,
} from './Auth_Store/auth_store';

export function authenticateUsername(username: string): UsernameValidity {
  let validUsername: UsernameValidity = {
    usernameMessage: 'Please Provide a user name',
    usernameValid: false,
  };

  if (username) {
    if (username.length >= 5 && username.length <= 64) {
      validUsername.usernameValid = true;
      validUsername.usernameMessage = '';
    } else {
      validUsername.usernameValid = false;
      validUsername.usernameMessage =
        'Please Ensure Your User Name Has A Minimum Of 5 Characters (Max is 64)';
    }
  }
  return validUsername;
}

export function authenticateEmail(email: string): EmailValidity {
  let validEmail: EmailValidity = {
    emailMessage: 'Please provide an email',
    emailValid: false,
  };

  if (email) {
    let emailRegex = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (emailRegex.test(email)) {
      validEmail.emailValid = true;
      validEmail.emailMessage = '';
    } else {
      validEmail.emailMessage = 'Please provide a valid email';
      validEmail.emailValid = false;
    }
  }
  return validEmail;
}

export function authenticatePassword(password: string): PasswordValidity {
  let validPassword: PasswordValidity = {
    passwordMessage: 'Please provide a password',
    passwordValid: false,
  };
  //the regex for checking string:
  let upperCase = new RegExp('[A-Z]');
  let lowerCase = new RegExp('[a-z]');
  let numbers = new RegExp('[0-9]');
  let specialCharacters = new RegExp('[^a-zA-Z0-9]');
  if (password) {
    if (password.length > 7) {
      if (upperCase.test(password)) {
        if (lowerCase.test(password)) {
          if (numbers.test(password)) {
            if (specialCharacters.test(password)) {
              validPassword.passwordMessage = '';
              validPassword.passwordValid = true;
            } else {
              validPassword.passwordMessage =
                'Please ensure your password has speacial chaters, such as {#, $, @} etc...';
              validPassword.passwordValid = false;
            }
          } else {
            validPassword.passwordMessage =
              'Please ensure your password has atleast one digit';
            validPassword.passwordValid = false;
          }
        } else {
          validPassword.passwordMessage =
            'Please ensure your password has atleast one Lowercase';
          validPassword.passwordValid = false;
        }
      } else {
        validPassword.passwordMessage =
          'Please ensure your password has atleast one Uppercase';
        validPassword.passwordValid = false;
      }
    } else {
      validPassword.passwordMessage =
        'Please ensure your password is atleast 8 characters';
      validPassword.passwordValid = false;
    }
  }
  return validPassword;
}
