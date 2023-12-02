import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import NavberTop from './components/NavberTop';
import ProductCategoryList from './ProductCategoryList';

const AllRoutes = () => {
  const storageData = JSON.parse(localStorage.getItem("userData"))

  const PrivateRoute = ({ children }) => {
    return storageData !== null ? <>{children}</> : (<><Navigate to="/login" /></>)
  }
  const PublicRoute = ({ children }) => {
    return storageData === null ? <>{children}</> : (<><Navigate to="/" /></>)
  }

  return (
    <>
      <PrivateRoute>
        <NavberTop />
      </PrivateRoute>

      <Routes>
        <Route exac path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route exac path='/' element={<PrivateRoute><ProductCategoryList/></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default AllRoutes