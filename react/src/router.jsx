import {createBrowserRouter} from 'react-router-dom'
import Login from './viwes/Login';
import Signup from './viwes/Signup';
import Users from './viwes/Users';
import NotFound from './viwes/NotFound';

const router = createBrowserRouter([
   {
    path: '/login',
    element: <Login />
   },
   {
    path: '/signup',
    element: <Signup />
   },
   {
    path: '/users',
    element: <Users />
   },
   {
    path: "*",
    element: <NotFound />
   }

])

export default router;