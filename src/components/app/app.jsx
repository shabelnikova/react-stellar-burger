
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFoundPage from "../../pages/not-found";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {getAllItems} from "../../services/actions/ingredients-action";
import HomePage from "../../pages/home";
import OrderDetails from "../order-details/order-details";
import Layout from "../layout/layout";
import ProtectedRoute from "../protected-route/protected-route";
import {currentUserRequest} from "../../services/actions/get-current-user-action";
import {setAccessToken, setRefreshToken} from "../../utils/token";


function App() {
const location = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();
const currentUser = useSelector(state => state.getCurrentUser);
const userData = useSelector(state => state.registerReducer)

useEffect(() => {
    dispatch(getAllItems())
  }, []);
useEffect(() => {
  dispatch(currentUserRequest());

}, [])
 useEffect(() => {
   console.log(currentUser)
   if(currentUser.refreshToken)
    setRefreshToken(currentUser.refreshToken);
   if(currentUser.accessToken) {
     setAccessToken(currentUser.accessToken);
     dispatch(currentUserRequest());
   }

   // if(currentUser.success)
   //  navigate('/')
 }, [])
const backgroundLocation = location.state?.background;
const closePopup = () => {
  navigate(backgroundLocation.pathname || '/', {replace: true});
}

   return (
       <>
         <Routes location={backgroundLocation || location}>
           <Route path="/" element={<Layout/>}>
             <Route index element={<HomePage/>}/>
             <Route path="login" element={<LoginPage/>}/>
             <Route path="register" element={<RegisterPage/>}/>
             <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
             <Route path="reset-password" element={<ResetPasswordPage/>}/>

             <Route path="profile" element={<ProtectedRoute currentUser={currentUser}><ProfilePage/></ProtectedRoute>}/>

             <Route path="order" element={<OrderDetails/>}/>
             <Route path="*" element={<NotFoundPage />} />
             <Route path='ingredients/:id' element={<IngredientDetails />}/>
           </Route>


         </Routes>
         {backgroundLocation && <Routes>
           <Route path='/ingredients/:id' element={<Modal closePopup={closePopup}>
             <IngredientDetails />
           </Modal>}/>
           <Route path='/order' element={<Modal closePopup={closePopup}>
             <OrderDetails />
           </Modal>}/>
         </Routes>}
       </>
  );
}

export default App;
