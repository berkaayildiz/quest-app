import React from 'react'; // Import React
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Auth from './components/Auth/Auth';
import PageNotFound from './components/PageNotFound/PageNotFound';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/auth/login" element={localStorage.getItem("currentUserId") != null ? <Navigate to="/" replace /> : <Auth mode="login"/>} />
          <Route path="/auth/signup" element={localStorage.getItem("currentUserId") != null ? <Navigate to="/" replace /> : <Auth  mode="signup" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
