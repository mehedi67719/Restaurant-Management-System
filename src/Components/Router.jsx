import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import Login from "./Authentication/Login";

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
    ]
  },
  
]);