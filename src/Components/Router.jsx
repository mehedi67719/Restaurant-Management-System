import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Singup";
import Restaurants from "../Pages/Restaurants";
import Foods from "../Pages/Foods";
import Howitwork from "../Pages/Howitwork";
import Contact from "../Pages/Contact";
import Restaurantsdetels from "../Pages/Restaurantsdetels";
import Fooddetels from "../Pages/Fooddetels";
import Cart from "../Pages/Cart";
import Profile from "../Pages/Dashboard/admin/Profile";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Manageuser from "../Pages/Dashboard/admin/Manageuser";
import ManageFood from "../Pages/Dashboard/admin/ManageFood";
import ManageRestaurants from "../Pages/Dashboard/admin/ManageRestaurants";


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
        },
        {
          path:"/restaurants/:id",
          element:<Restaurantsdetels/>
        },
        {
          path:"/food/:id",
          element:<Fooddetels/>
        },
        {
          path:"/cart",
          element:<Cart/>
        },
      
     
    ]
  },

     {
          path:"/dashboard",
          element:<Dashboard/>,
          children:[
            {
              index:true,
              element:<Profile/>
            },
            {
              path:"/dashboard/admin/manage-user",
              element:<Manageuser/>
            },
            {
              path:"/dashboard/admin/manage-restaurants",
              element:<ManageRestaurants/>,
            },
            {
              path:"/dashboard/admin/manage-foods",
              element:<ManageFood/>
            }
          ]
        }
  
]);