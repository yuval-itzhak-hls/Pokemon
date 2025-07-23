import './App.css';
import AuthPage from './pages/Auth/auth-page/AuthPage';
import AuthLayout from './pages/Auth/auth-layout/AuthLayout';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom'; // Keep BrowserRouter and Routes
import { AppLayout } from './pages/AppLayout';
import { HomePage } from './pages/home-page/home/HomePage';
import { FightArenaPage } from './pages/fighting-arena-page/FightArenaPage';
import { BattleProvider } from "@/context/BattleContext";
import { ConfirmPage } from './pages/Auth/confirm-page/ConfirmPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <BattleProvider>
          <Routes>

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
              <Route path='/confirm' element={<ConfirmPage />} />
            </Route>

            <Route element={<AppLayout />}>
              <Route path="/all-pokemons" element={<HomePage key="all"mode="all" />} />
              <Route path="/my-pokemons" element={<HomePage key="my" mode="my" />} />
              <Route path="/fighting-arena-page" element={<FightArenaPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />

          </Routes>
        </BattleProvider>
      </BrowserRouter>
    </>
  );
}

export default App;