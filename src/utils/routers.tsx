export const APP_ROUTES = {
  // homepage
  HOME: "/",
  PROFILE: "/profile/user",
  // authentication
  LOGIN: "/login",
  SIGNUP: "/signup",

  // blogs
  BLOGS: "/blogs",
};

export const API_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const ADMIN_ROUTES = {
  PROFILE: "/profile/admin",
  DASHBOARD: "/dashboard",
  EDIT: "/dashboard/edit",
  CREATE: "/dashboard/create",
};

export const BLOG_ROUTES = {

  BLOGS: "/blogs",
  GET_LIST: "/",
  CREATE: "/create",
  FIND_BY_ID: "/:id",
  PATCH: "/edit/:id",
  DELETE: "/:id",
};
