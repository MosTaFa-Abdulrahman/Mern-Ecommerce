import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDZlNzk3NGY2ZGU1YTQzMjJkYTIwOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NTc1MTI4MywiZXhwIjoxNjY2NDQyNDgzfQ.2JhHE9zXJO0p-y_iQlNuisXrzZX29GmwkqHBto_HHCw";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
