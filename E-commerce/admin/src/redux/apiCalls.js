import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductsFauilure,
  deleteProductsStart,
  deleteProductsSuccess,
  getProductsFauilure,
  getProductsStart,
  getProductsSuccess,
  updateProductsFauilure,
  updateProductsStart,
  updateProductsSuccess,
} from "./productRedux";
import {
  addUsersFauilure,
  addUsersStart,
  addUsersSuccess,
  deleteUsersFauilure,
  deleteUsersStart,
  deleteUsersSuccess,
  getUsersFauilure,
  getUsersStart,
  getUsersSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
  updateUsersFauilure,
  updateUsersStart,
  updateUsersSuccess,
} from "./userRedux";

// Login
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch {
    dispatch(loginFailure());
  }
};

// LogOut
export const logOut = async (dispatch) => {
  try {
    dispatch(logout());
  } catch (error) {
    console.log(error);
  }
};

// Get Products
export const getProdducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await publicRequest.get("products");
    dispatch(getProductsSuccess(res.data));
  } catch {
    dispatch(getProductsFauilure());
  }
};

// Delete Product
export const deleteProdduct = async (dispatch, id) => {
  dispatch(deleteProductsStart());
  try {
    const res = await userRequest.delete(`products/delete/${id}`);
    dispatch(deleteProductsSuccess(res.data));
    // dispatch(deleteProductsSuccess(id));
  } catch {
    dispatch(deleteProductsFauilure());
  }
};

// Update Prdouct
export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductsStart());
  try {
    const res = await userRequest.put(`products/update/${id}`, product);
    dispatch(updateProductsSuccess(res.data));
  } catch (err) {
    dispatch(updateProductsFauilure());
  }
};

// export const updateProduct = async (dispatch, id, product) => {
//   dispatch(updateProductsStart());
//   try {
//    console.log(id, product);
//     dispatch(updateProductsSuccess({ id, product }));
//   } catch (err) {
//     dispatch(updateProductsFauilure());
//   }
// };

// Add Product
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post("products/create", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// Get Users
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get("users/get");
    dispatch(getUsersSuccess(res.data));
  } catch {
    dispatch(getUsersFauilure());
  }
};

// Delete User
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUsersStart());
  try {
    const res = await userRequest.delete(`users/delete/${id}`);
    dispatch(deleteUsersSuccess(res.data));
  } catch {
    dispatch(deleteUsersFauilure());
  }
};

// Update User
export const updateUser = async (dispatch, id, user) => {
  dispatch(updateUsersStart());
  try {
    const res = await userRequest.put(`users/update/${id}`, user);
    dispatch(updateUsersSuccess(res.data));
    // dispatch(updateUsersSuccess({ id, user }));
  } catch (err) {
    dispatch(updateUsersFauilure());
  }
};

// Add User
export const addUser = async (dispatch, user) => {
  // dispatch(addUsersStart());
  try {
    const res = await userRequest.post("auth/register", user);
    dispatch(addUsersSuccess(res.data));
  } catch (err) {
    // dispatch(addUsersFauilure());
    console.log(err);
  }
};
