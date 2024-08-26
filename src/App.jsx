import './App.css'
import Home from './pages/home/Home'
import About from './pages/about/About'
import NotFound from './pages/notFound/NotFound'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/layout/Layout'
import Admin from './admin/pages/Admin'
import Register from './pages/register/Register'
import ProtectedRoot from './pages/protectedRoot/ProtectedRoot'
import CoursesDetails from './pages/coursesDetails/CoursesDetails'
import Setting from './pages/setting/Setting'
import ProfileSetting from './pages/setting/profileSetting/ProfileSetting'
import AccountSetting from './pages/setting/accountSetting/AccountSetting'
import CoursesCart from "./pages/cart/CoursesCart";
import CoursesList from "./pages/coursesList/CoursesList";
import Wishlist from "./pages/wishlist/Wishlist";

import Contact from './pages/cotact/Contact'
import MyCourses from './pages/setting/myCourses/MyCourses'
import Login from './pages/signin/Login'

function App() {

  const queryClient = new QueryClient()


  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<Layout ></Layout>}>
              <Route path='' element={<Home></Home>}></Route>
              <Route path='/about' element={<About></About>}></Route>
              <Route path='/course/:id' element={<CoursesDetails></CoursesDetails>}></Route>
              <Route path='/contact' element={<Contact></Contact>}></Route>
              <Route path='/setting' element={<ProtectedRoot><Setting></Setting></ProtectedRoot>}>
                <Route path='/setting' element={<ProtectedRoot> <ProfileSetting></ProfileSetting></ProtectedRoot>}></Route>
                <Route path='/setting/account' element={<ProtectedRoot><AccountSetting></AccountSetting></ProtectedRoot>}></Route>
                <Route path='/setting/mycourses' element={<ProtectedRoot><MyCourses></MyCourses></ProtectedRoot>}></Route>
              </Route>
              <Route path="/cart" element={<ProtectedRoot><CoursesCart /></ProtectedRoot>}></Route>
              <Route path="/courses" element={<CoursesList />}></Route>
              <Route path="/wishlist" element={<ProtectedRoot><Wishlist /></ProtectedRoot>}></Route>
              <Route path='/admin/*' element={<ProtectedRoot><Admin /></ProtectedRoot>}></Route>

              <Route path='/register' element={<Register></Register>}></Route>
              <Route path='/login' element={<Login></Login>}></Route>
              <Route path='*' element={<NotFound></NotFound>}></Route>

            </Route>
          </Routes>
        </BrowserRouter>

      </QueryClientProvider>



    </>
  );
}

export default App;
