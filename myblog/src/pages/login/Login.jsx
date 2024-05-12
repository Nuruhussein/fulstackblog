
import axios from "axios";
import { useContext,useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
 
    const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");

  const { dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
          username,
        
        password,
      });
     
      const token = await res.data.token;
      localStorage.setItem('jwt', token); // Store JWT in local storage
      let user={};
         try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT in the request header
          },
        });
        user = response.data;

      } catch (error) {
        console.error('Error fetching user data:', error.response?.data.message);
      }
  
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
             onChange={(e) => setUsername(e.target.value)}
          // ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
          // ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
      
    </div>
  );
}
