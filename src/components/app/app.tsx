
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
import HomePage from "../../pages/home";
import OrderDetails from "../order-details/order-details";
import Layout from "../layout/layout";
import ProtectedRoute from "../protected-route/protected-route";
import {currentUserRequest} from "../../services/slice/userSlice";
import {clearIngredientInfo, ingredientsRequest} from "../../services/slice/ingredientsSlice";
import {useAppDispatch} from "../../services/hooks";
import {resetOrderNumber} from "../../services/slice/orderSlice";
import OrderFeedPage from "../../pages/order-feed";
import OrderDetailsInfo from "../order-details-info/order-details-info";

function App() {
const location = useLocation();
const navigate = useNavigate();
const dispatch = useAppDispatch();

useEffect(() => {
    dispatch(ingredientsRequest())
  }, []);
useEffect(() => {
  dispatch(currentUserRequest());
}, []);

const backgroundLocation = location.state?.background;
const closePopup = (path: string) => {
    if(path.includes('ingredients')) {
        dispatch(clearIngredientInfo());
    }
    if(path.includes('order')) {
        dispatch(resetOrderNumber());
    }
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
                   path="feed"
                   element={<OrderFeedPage/>}/>
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
             <Route
               path="profile/orders"
               element={
                 <ProtectedRoute  >
                   <ProfilePage/>
                 </ProtectedRoute>}/>

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
           <Route path='/feed/:id' element={<Modal closePopup={closePopup}>
             <OrderDetailsInfo/>
           </Modal>}/>
           <Route path='/profile/orders/:id' element={<Modal closePopup={closePopup}>
             <OrderDetailsInfo/>
           </Modal>}/>
         </Routes>}
       </>
  );
}

export default App;
