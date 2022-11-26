import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProdduct, getProdducts } from "../../redux/apiCalls";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  // get Product API
  useEffect(() => {
    getProdducts(dispatch);
  }, [dispatch]);

  // Delete Product
  const handleDelete = (id) => {
    deleteProdduct(dispatch, id);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img src={params.row.img} alt="Error" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 160 },

    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </NavLink>
            <DeleteOutlined
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
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

export default ProductList;
