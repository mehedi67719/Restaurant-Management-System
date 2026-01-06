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
import Dashboard from "../Pages/Dashboard/Dashboard";
import Manageuser from "../Pages/Dashboard/admin/Manageuser";
import ManageFood from "../Pages/Dashboard/admin/ManageFood";
import ManageRestaurants from "../Pages/Dashboard/admin/ManageRestaurants";
import Myorders from "../Pages/Dashboard/Myorders";
import Profile from "../Pages/Dashboard/Profile";
import AddFoods from "../Pages/Dashboard/Seller/AddFoods";
import ManageUploadFood from "../Pages/Dashboard/Seller/ManageUploadFood";
import ManageMyFoodOrder from "../Pages/Dashboard/Seller/ManageMyFoodOrder";
import DeliveredFood from "../Pages/Dashboard/Seller/DeliveredFood";
import TotalOrder from "../Pages/Dashboard/Seller/TotalOrder";


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
            },
            {
              path:"/dashboard/my-order",
              element:<Myorders/>
            },
            {
              path:"/dashboard/seller/add-food",
              element:<AddFoods/>
            },
            {
              path:"/dashboard/seller/manage-foods",
              element:<ManageUploadFood/>
            },
            {
              path:"/dashboard/seller/orders",
              element:<ManageMyFoodOrder/>
            },
            {
              path:"/dashboard/seller/delivered",
              element:<DeliveredFood/>
            },
            {
              path:"/dashboard/seller/total-orders",
              element:<TotalOrder/>
            }
          
          ]
        }
  
]);