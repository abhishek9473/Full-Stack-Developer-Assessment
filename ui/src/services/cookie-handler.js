import Cookies from "js-cookie";

const setJwtInCookie = (token) => {
  Cookies.set("token", token);
};

const setNameInCookie = (userName) => {
  const firstName = userName.toLowerCase().split(" ")[0];
  Cookies.set("user", firstName);
};

const setAuthInCookie = (value) => {
  Cookies.set("auth", value);
};

const setroutePermissionInCookie = (value) => {
  Cookies.set("validUser", value);
};

export {
  setJwtInCookie,
  setNameInCookie,
  setAuthInCookie,
  setroutePermissionInCookie,
};
