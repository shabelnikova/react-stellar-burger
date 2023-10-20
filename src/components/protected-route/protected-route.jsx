import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children, currentUser}) => {
  if(!currentUser.user.email) {
    console.log(currentUser.user.email)
    return <Navigate to={{pathname: '/login'}}/>
  }
  if(currentUser.user.email) {
    return <Navigate to={{pathname: '/profile'}}/>
  }
  return children;
};

export default ProtectedRoute;