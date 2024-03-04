// is loggedIn
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};

//doLogin =>data set to local storeage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//logout =>remove token from localstorage

export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};

//get current user
export const getCurrentUserDeatil = () => {
  if (isLoggedIn) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return false;
  }
};

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).token;
  } else {
    return null;
  }
};
