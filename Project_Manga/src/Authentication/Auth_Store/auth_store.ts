import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PasswordValidity = {
  passwordMessage: string;
  passwordValid: boolean;
};
export type UsernameValidity = {
  usernameMessage: string;
  usernameValid: boolean;
};
export type EmailValidity = {
  emailMessage: string;
  emailValid: boolean;
};
export interface iSignUp {
  usernameValid: UsernameValidity;
  emailValid: EmailValidity;
  passwordValid: PasswordValidity;
}

export interface SingUpData {
  username: string;
  email: string;
  password: string;
}

const initialState: iSignUp = {
  usernameValid: {} as UsernameValidity,
  emailValid: {} as EmailValidity,
  passwordValid: {} as PasswordValidity,
};

const authonticationSlice = createSlice({
  name: 'authonticationState',
  initialState,
  reducers: {
    setUsernameValidity: (state, action: PayloadAction<UsernameValidity>) => {
      state.usernameValid = action.payload;
    },
    setEmailValidity: (state, action: PayloadAction<EmailValidity>) => {
      state.emailValid = action.payload;
    },
    setPasswordValidity: (state, action: PayloadAction<PasswordValidity>) => {
      state.passwordValid = action.payload;
    },
  },
});

export const { setUsernameValidity, setEmailValidity, setPasswordValidity } =
  authonticationSlice.actions;
export default authonticationSlice.reducer;
