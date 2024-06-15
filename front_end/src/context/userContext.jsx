import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { makeRequest } from '../axios.js';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const login = async (inputs, setErr, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (inputs.email.trim() !== '' && inputs.password.trim() !== '') {
        const response = await makeRequest.post(
          '/login',
          {
            email: inputs.email,
            password: inputs.password
          },
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json; charset=UTF-8'
            },
            withCredentials: true
          }
        );

        setErr(null);

        let { access_token, ...info } = response.data;

        localStorage.setItem('user', JSON.stringify(info));
        localStorage.setItem('access_token', JSON.stringify(access_token));

        setLoading(false);
        navigate('/');
      } else throw new Error('Vui lòng nhập đầy đủ dữ liệu!');
    } catch (err) {
      setLoading(false);
      if (err.response?.data) setErr(err.response.data.message);
      else if (err.request) {
        console.log(err.request);
      } else setErr(err.message);
    }
  };

  const register = async (inputs, setErr, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        inputs.username.trim() !== '' &&
        inputs.email.trim() !== '' &&
        inputs.password.trim() !== ''
      ) {
        const response = await makeRequest.post(
          '/register',
          {
            username: inputs.username,
            email: inputs.email,
            password: inputs.password
          },
          {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json; charset=UTF-8'
            },
            withCredentials: true
          }
        );

        let { access_token, ...info } = response.data;

        setErr(null);
        
        localStorage.setItem('user', JSON.stringify(info));
        localStorage.setItem('access_token', JSON.stringify(access_token));
        setLoading(false);

        navigate('/');
      } else {
        throw new Error('Vui lòng nhập đầy đủ dữ liệu!');
      }
    } catch (err) {
      setLoading(false);
      if (err.response?.data) setErr(err.response.data.message);
      else if (err.request) {
        console.log(err.request);
      } else setErr(err.message);
    }
  };

  const authenGoogle = async (currentRef, param, codeParam) => {
    if (currentRef.current.includes(param)) {
      setLoading(true);

      try {
        const res = await makeRequest.get(`/oauth/token?${param}=${codeParam}`);
        const { access_token, ...info } = res.data;

        localStorage.setItem('user', JSON.stringify(info));
        localStorage.setItem('access_token', JSON.stringify(access_token));
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
        navigate('/');
      }
    }
  };

  return (
    <UserContext.Provider value={{ login, register, authenGoogle, loading }}>
      {children}
    </UserContext.Provider>
  );
};
