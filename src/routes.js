import Home from "./views/Home";
import Login from "./views/Login";
import Forgot from "./views/Forgot";
import Register from "./views/Register";
import Order from "./views/Order";
import Profile from "./views/Profile";
import Thanks from "./views/Thanks";

export default [
    {
      path: "/",
      exact: true,
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/forgot/:verify?",
      component: Forgot,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/order",
      component: Order,
    },
    {
      path: "/profile",
      component: Profile,
    },
    {
      path: "/thanks/:verify",
      component: Thanks,
    },
];
