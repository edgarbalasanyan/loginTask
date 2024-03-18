import ForgotPass from "./components/forgot-password/ForgotPass";
import Login from "./components/login/Login";
// import { useEffect } from "react";
// import { gapi } from "gapi-script";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// const clientID =
//   "273854726861-iu3dusc2iasbakctis5s60sb20ibimme.apps.googleusercontent.com";
function App() {
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({ clientID: clientID, scope: "" });
  //   }
  //   gapi.load("client:auth2", start);
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
