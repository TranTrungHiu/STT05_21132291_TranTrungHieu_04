import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import EditProfileScreen from "./screens/EditProfile/EditProfileScreen";
import UserProfileScreen from "./screens/UserProfile/UserProfileScreen";
import MessageScreen from "./screens/Messages/MessageScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {" "}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/edit-profile" element={<EditProfileScreen />} />
        <Route path="/profile/:userId" element={<UserProfileScreen />} />
        <Route path="/messages/:userId" element={<MessageScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
