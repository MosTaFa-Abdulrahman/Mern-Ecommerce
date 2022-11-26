import "./user.css";
import {
  PermIdentityOutlined,
  MailOutline,
  PublishOutlined,
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";

function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // updateUser(dispatch, user);
  //  Add User API
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", {
            ...inputs,
            img: downloadURL,
          });
          const user = {
            ...inputs,
            img: downloadURL,
            userId,
          };
          updateUser(dispatch, userId, user);
        });
      }
    );
  };

  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  return (
    <div className="user">
      <div className="userTitleContaier">
        <h1 className="userTitle">Edit User</h1>
        <NavLink to="/newUser">
          <button className="userAddButton">Create</button>
        </NavLink>
      </div>

      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              className="userShowImg"
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt="Error"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentityOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">myInfo</span>
            </div>

            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={user.username}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="text"
                  placeholder={user.email}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  name="password"
                  onChange={handleChange}
                  className="userUpdateInput"
                  type="password"
                  placeholder="Password...."
                />
              </div>
            </div>
            <div className="userUpdateRigth">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    user.img ||
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                  }
                  alt="Error"
                />
                <label htmlFor="file">
                  <PublishOutlined style={{ cursor: "pointer" }} />
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  id="file"
                  type="file"
                  hidden
                />
              </div>
              <button onClick={handleUpdateUser} className="userUpdateButton">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
