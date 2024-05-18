import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { decode } from 'js-base64';

import HomePage from './pages/HomePage/HomePage.jsx';
import AuthPage from './pages/AuthPage/AuthPage.jsx';
import PageLayout from './Layouts/PageLayout/PageLayout.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';

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
  return (
    <PageLayout>
      <Routes>
        <Route path="/auth" index={true} element={<AuthPage />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route index={true} path="" element={<HomePage />} />
          <Route path=":username" element={<ProfilePage />} />
        </Route>
      </Routes>
    </PageLayout>
  );
}

export default App;
