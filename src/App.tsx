import './App.css'
import AuthPage from './pages/Auth/AuthPage';
import AuthLayout from './pages/Auth/AuthLayout';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AppLayout } from './pages/AppLayout';
import { HomePage } from './pages/home-page/HomePage';
import { FightArenaPage } from './pages/fighting-arena-page/FightArenaPage';
import { BattleProvider } from "@/context/BattleContext";

 
function App() {
    
  return (
    <>
     <BrowserRouter>
      <BattleProvider>

      <Routes>
      
        <Route element={<AuthLayout />}>
          <Route path="/login"  element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/home-page" element={<HomePage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/fighting-arena-page" element={<FightArenaPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />

      </Routes>
    </BattleProvider>
    </BrowserRouter>

    </>
  )
}

export default App
          
