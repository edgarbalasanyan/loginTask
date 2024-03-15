import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/login/Login";

function App() {
  return (
    <GoogleOAuthProvider clientId={""}>
     <Login/>
    </GoogleOAuthProvider>
  );
}

export default App;
