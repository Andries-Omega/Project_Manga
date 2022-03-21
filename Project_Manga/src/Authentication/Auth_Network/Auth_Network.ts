import { SingUpData } from '../Auth_Store/auth_store';

export const signUp = async (signupData: SingUpData): Promise<any> => {
  return await fetch('https://api.mangadex.org/account/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupData),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });
};
