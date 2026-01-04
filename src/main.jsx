import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './Components/Router.jsx'
import { RouterProvider } from "react-router/dom";
import Authprovider from './Components/Authprovider.jsx';
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient=new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <RouterProvider router={router} />
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>,
)
