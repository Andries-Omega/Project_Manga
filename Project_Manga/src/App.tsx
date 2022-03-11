import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import Home from "./Home/Home";
import ReCAPTCHA from "react-google-recaptcha";

export default function App() {

  return (
    <div className=" overflow-x-none">
      <ReCAPTCHA
        sitekey="6LcA_s4eAAAAAJQv1xOIEy2p9TXNZE_9mvKUO7pM"
        onChange={(e: any) => {
          console.log(e);
        }}
      />
      <Header />

      <div className="pl-[65px]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
