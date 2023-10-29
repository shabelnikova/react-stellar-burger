import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({children, onlyUnAuth}) => {
const currentUser = useSelector(state => state.userSlice.data)
const isAuthCheck = useSelector(state => state.userSlice.isAuthChecked);
const location = useLocation();
if(!isAuthCheck) {
  return <h1>Loading...</h1>
}
if(currentUser && onlyUnAuth) {
  const from = location.state?.from || {pathname: "/"}
  return <Navigate to={from}/>
}
if(!currentUser && !onlyUnAuth) {
    return <Navigate to={{pathname: '/login'}} state={{from: location}}/>
}
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.element,
  onlyUnAuth: PropTypes.bool
}
export default ProtectedRoute;