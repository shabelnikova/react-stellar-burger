
import {Routes, Route, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NotFoundPage from "../../pages/not-found";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import HomePage from "../../pages/home";
import OrderDetails from "../order-details/order-details";
import Layout from "../layout/layout";
import ProtectedRoute from "../protected-route/protected-route";
import {currentUserRequest} from "../../services/slice/userSlice";
import {ingredientsRequest} from "../../services/slice/ingredientsSlice";

function App() {
const location = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();

useEffect(() => {
    dispatch(ingredientsRequest())
  }, []);
useEffect(() => {
  dispatch(currentUserRequest());
}, []);

const backgroundLocation = location.state?.background;
const closePopup = () => {
  navigate(backgroundLocation.pathname || '/', {replace: true});
}

   return (
       <>
         <Routes location={backgroundLocation || location}>
           <Route path="/" element={<Layout/>}>
             <Route
               index
               element={<HomePage/>}/>
             <Route
               path="login"
               element={
               <ProtectedRoute onlyUnAuth>
                 <LoginPage/>
               </ProtectedRoute>}/>
             <Route
               path="register"
               element={
               <ProtectedRoute onlyUnAuth>
                 <RegisterPage/>
               </ProtectedRoute>}/>
             <Route
               path="forgot-password"
               element={
                 <ProtectedRoute onlyUnAuth>
                   <ForgotPasswordPage/>
                 </ProtectedRoute>}/>
             <Route
               path="reset-password"
               element={
               <ProtectedRoute onlyUnAuth>
                 <ResetPasswordPage/>
               </ProtectedRoute>}/>
             <Route
               path="profile"
               element={
               <ProtectedRoute  >
                 <ProfilePage/>
               </ProtectedRoute>}/>

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
