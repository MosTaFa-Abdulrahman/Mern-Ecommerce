import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/apiCalls";
import "./newUser.css";

function NewUser() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // ADD User
  const handleAddClick = (e) => {
    e.preventDefault();
    const user = { ...inputs };
    console.log(user);
    addUser(dispatch, user);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Add New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            name="username"
            onChange={handleChange}
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email..."
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password..."
          />
        </div>

        <button onClick={handleAddClick} className="newUserButton">
          Create
        </button>
      </form>
    </div>
  );
}

export default NewUser;
