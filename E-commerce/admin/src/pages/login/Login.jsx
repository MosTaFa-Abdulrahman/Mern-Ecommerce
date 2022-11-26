import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.currentUser);
  // console.log(currentUser);

  const handleLoginButton = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <div
      style={{
        display: "flex",
        flex: "4",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input
          style={{ marginBottom: "20px", padding: "10px" }}
          type="text"
          placeholder="username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ marginBottom: "20px", padding: "10px" }}
          type="password"
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* {error && <h3 style={{ color: "red" }}>you are not Admin ☻~</h3>} */}
        <br />

        <button
          style={{
            padding: "10px",
            border: "3px solid green",
            borderRadius: "5px",
          }}
          disabled={isFetching}
          onClick={handleLoginButton}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
