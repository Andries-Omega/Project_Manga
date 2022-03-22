import React, { useRef } from 'react';
import { useForm } from '@felte/react';
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from 'react-google-recaptcha-v3';
export default function RecaptchaForm() {
  const getCaptchaResults = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey="6LflOrIaAAAAACcpRSiKQlt_X6bq-QcVjHTG1diJ">
        <GoogleReCaptcha onVerify={(e) => getCaptchaResults(e)} />
      </GoogleReCaptchaProvider>
    </>
  );
}
