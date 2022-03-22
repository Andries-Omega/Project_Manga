import { SingInData, SingUpData } from '../Auth_Store/auth_store';

export const signUp = async (signupData: SingUpData): Promise<any> => {
  return await fetch('https://api.mangadex.org/account/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupData),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export const signIn = async (signinData: SingInData): Promise<any> => {
  return await fetch('https://api.mangadex.org/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signinData),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
