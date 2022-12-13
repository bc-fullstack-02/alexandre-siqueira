import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login  from "./Pages/Login" 
import SignUp  from "./Pages/SignUp" 
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import Friends from './Pages/Friends'
import "./index.css"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/profile",
        element: <ProfilePage />
    },
    {
        path: "/friends",
        element: <Friends />
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
