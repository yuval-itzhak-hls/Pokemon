import './App.css'
import AuthPage from './pages/Auth/AuthPage'
import AuthLayout from './pages/Auth/AuthLayout'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
 
function App() {
    
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthPage mode='login'/>} />
          <Route path="/signup" element={<AuthPage mode='signup'/>} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
