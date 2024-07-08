import Topbar from "./components/topbar/TopBar";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Write from "./pages/write/Write";
import Single from "./pages/single/Single";
import HomePage from "./pages/homepage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
function App() {
  const { user } = useContext(Context);
 // user from context
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<HomePage />} />
        <Route path="/register" element={user ? <HomePage /> : <Register />} />
        <Route path="/login" element={user ? <HomePage /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
