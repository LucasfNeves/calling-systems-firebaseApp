import { Navigate, Route, Routes } from 'react-router-dom'

import { Dashboard } from '../pages/Dashboard'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'

import { Private } from './Private'
import { DefaultLayout } from '../layout/defaultLayout'
import { Profile } from '../pages/Profile'
import { Customers } from '../pages/Customers'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/app" element={<DefaultLayout />}>
        <Route
          path="dashboard"
          element={
            <Private>
              <Dashboard />
            </Private>
          }
        />
        <Route
          path="customers"
          element={
            <Private>
              <Customers />
            </Private>
          }
        />
        <Route
          path="profile"
          element={
            <Private>
              <Profile />
            </Private>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
