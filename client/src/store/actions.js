import axios from "axios";

import { SIGN_IN_DEVELOPER, DEVELOPER_SIGNIN_SUCCESS } from "../store/types";

export let developerSignInSucess = (payload) => {
  return { type: DEVELOPER_SIGNIN_SUCCESS, payload };
};

export let signInDeveloper = (payload, history) => {
  return (dispatch) => {
    axios
      .post("/api/users/login", payload)
      .then((user) => {
        if (user.data.success) {
          dispatch(
            developerSignInSucess({
              isDeveloperAuthenticated: true,
              isAuthInProgress: false,
            })
          );
          localStorage.setItem("token", user.data.token);
          localStorage.setItem("id", user.data.id);
        }
        history.push(`/dashboard`);
      })
      .catch((err) => console.log(err.response.data));
  };
};
