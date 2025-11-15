import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Authentication/Login/Login";
import Signup from "./components/Authentication/Signup/Signup";
import PasswordReset from "./components/Authentication/PasswordReset/PasswordReset";
import ProfilePage from "./components/Profile/ProfilePage/ProfilePage";
import EditProfile from "./components/Profile/EditProfile/EditProfile";

const App = () => {
  const location = useLocation();
  const hideNavRoutes = ["/login", "/signup", "/passwordReset", "/verifyuser"];
  return (
    <>
      <Toaster
        position="top-center"
        gutter={16}
        toastOptions={{
          duration: 5000,
          success: { duration: 5000 },
          error: { duration: 6000 },
          loading: { duration: Infinity },
        }}
      />
      {!hideNavRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/passwordReset" element={<PasswordReset />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
