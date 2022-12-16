import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login  from "./Pages/Login" 
import SignUp  from "./Pages/SignUp" 
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import Friends from './Pages/Friends'
import "./index.css"
import PostDetail from './Pages/PostDetail'


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
    },
    {
        path: "/posts/:postId",
        element: <PostDetail />
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
