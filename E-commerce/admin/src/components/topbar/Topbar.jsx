import "./topbar.css";
import {
  NotificationsNoneOutlined,
  Language,
  Settings,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { logOut } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  // console.log(user);
  const dispatch = useDispatch();

  const handleLogOutButton = (e) => {
    logOut(dispatch);
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <NavLink to="/">
          <div className="topLet">
            <span className="logo">Darshadmin</span>
          </div>
        </NavLink>

        <div className="topRigth">
          <div className="topbarIconContainer">
            {user ? (
              <NavLink to="/login">
                <button
                  style={{
                    border: "2px solid red",
                    borderRadius: "10px",
                    color: "red",
                    backgroundColor: "#eee",
                    cursor: "pointer",
                  }}
                  onClick={handleLogOutButton}
                >
                  LogOut
                </button>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <button
                  style={{
                    border: "2px solid uellow",
                    borderRadius: "10px",
                    color: "green",
                    backgroundColor: "#eee",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  login
                </button>
              </NavLink>
            )}
            <NotificationsNoneOutlined />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/shop-2e7f2.appspot.com/o/1660559581386React_(web_framework)-Logo.wine.png?alt=media&token=b163a0a0-8e7c-43a2-b581-8b3cde1a8e34"
            alt="error"
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
