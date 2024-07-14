import { FC } from 'react'; // Import React
import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';
import PageNotFound from './components/PageNotFound/PageNotFound';

import { AuthUser } from './types/AuthUser';

const App: FC = () =>
  {
  // Holds the current user's credentials
  const authUser: AuthUser = JSON.parse(localStorage.getItem('authUser') || '{}');


  // Displays the app's navigation bar and routes
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/auth/login" element={authUser.id != null ? <Navigate to="/" replace /> : <Auth mode="login"/>} />
          <Route path="/auth/signup" element={authUser.id != null ? <Navigate to="/" replace /> : <Auth  mode="signup" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
