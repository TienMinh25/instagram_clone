import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { decode } from 'js-base64';
import ChatPage from './pages/ChatPage/ChatPage.jsx';
import PageLayout from './Layouts/PageLayout/PageLayout.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import { useEffect, useState } from 'react';

function PrivateRoute() {
  let checkNotExpired = true;
  const access_token = localStorage.getItem('access_token');

  if (!access_token) {
    checkNotExpired = false;
  } else {
    const payload = decode(access_token.split('.')[1]);

    checkNotExpired = Date.now() > payload.exp * 1000 ? false : true;
  }

  return checkNotExpired ? <Outlet /> : <Navigate to="/auth" />;
}

function App() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (location.pathname === '/chat') {
      setIsSidebarCollapsed(true);
    } else {
      setIsSidebarCollapsed(false);
    }
  }, [location.pathname]);

  return (
    <PageLayout isCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed}>
      <Routes>
        <Route path="/auth" index={true} element={<AuthPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index={true} path="" element={<HomePage />} />
          <Route path=":username" element={<ProfilePage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </PageLayout>
  );
}

export default App;
