import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteUser, getUsers } from "../../redux/apiCalls";

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  // get Users API
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  // Delete User
  const handleDelete = (id) => {
    deleteUser(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              src={
                params.row.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt="Error"
              className="userListImg"
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 160 },

    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </NavLink>
            <DeleteOutlined
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        checkboxSelection
      />
    </div>
  );
}

export default UserList;
