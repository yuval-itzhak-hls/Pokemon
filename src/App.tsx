import './App.css'
import AuthPage from './pages/auth/AuthPage'
import AuthLayout from './pages/auth/AuthLayout'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AppLayout } from './pages/home-page/AppLayout';
import { HomePage } from './pages/home-page/HomePage';
 
function App() {
    
  return (
    <>
     <BrowserRouter>
      <Routes>
      
        <Route element={<AuthLayout />}>
          <Route path="/login"  element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/home-page" element={<HomePage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
        
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
          
