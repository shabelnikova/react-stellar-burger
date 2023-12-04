import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {useAppSelector} from "../../services/hooks";
interface IProps {
  children: React.ReactElement,
  onlyUnAuth?: boolean
}
const ProtectedRoute = ({children, onlyUnAuth}: IProps) => {
const currentUser = useAppSelector(state => state.userSlice.data)
const isAuthCheck = useAppSelector(state => state.userSlice.isAuthChecked);
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