import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Singup";
import Restaurants from "../Pages/Restaurants";
import Foods from "../Pages/Foods";
import Howitwork from "../Pages/Howitwork";
import Contact from "../Pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
        {
            index:true,
            element:<Home/>
        },
        {
            path:"/login",
            element:<Login/>
        }
        ,{
            path:"/signup",
            element:<Signup/>
        },
        {
          path:"/restaurants",
          element:<Restaurants/>
        },
        {
          path:"/foods",
          element:<Foods/>
        },
        {
          path:"/how-it-works",
          element:<Howitwork/>
        },
        {
          path:"/contact",
          element:<Contact/>
        }
    ]
  },
  
]);