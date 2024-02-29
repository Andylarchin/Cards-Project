import React from 'react';
import { useEffect } from 'react';

const AdminPage = () => {
  const postUser = () => {
    const url = 'https://api.escuelajs.co/api/v1/users/';
    const data = {
      name: 'Andyz',
      email: 'andylarchin',
      password: 'andylarchin',
      avatar: 'https://picsum.photos/800',
      role: 'admin',
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log('Login successful:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const login = () => {
    const url = 'https://api.escuelajs.co/api/v1/auth/login';
    const data = {
      email: 'andylarchin123@gmail.com',
      password: 'andylarchin',
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log('Login successful:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button onClick={() => postUser()}>Register</button>
      <button onClick={() => login()}>Login</button>
    </div>
  );
};

export default AdminPage;
