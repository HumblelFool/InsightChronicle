import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Button, Form } from 'reactstrap';
import Base from './components/Base';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Loging from './pages/Loging';
import Signup from './pages/Signup';
import About from './pages/About';
import Service from './pages/Service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashBoard from './pages/user-route/UserDashBoard';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './pages/user-route/ProfileInfo';
import PostPage from './pages/postPage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';

function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Loging />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/posts/:postId' element={<PostPage />} />
          <Route path='/categories/:categoryId' element={<Categories />} />
          <Route path='/services' element={<Service />} />
          <Route path='/user' element={<PrivateRoute />}>
            <Route path='dashboard' element={<UserDashBoard />} />
            <Route path='profile' element={<ProfileInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}

export default App
