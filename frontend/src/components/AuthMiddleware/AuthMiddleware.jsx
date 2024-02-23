import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = (WrappedComponent) => {
  const WithAuth = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if the token is present in localStorage
      const isAuthenticated = localStorage.getItem('token') !== null;

      if (!isAuthenticated) {
        // Redirect to the login page and remember the intended URL
        navigate('/login', { state: { from: props.location } });
      }
    }, [navigate, props.location]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return WithAuth;
};

export default AuthMiddleware;
