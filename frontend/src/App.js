import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import WelcomePage         from './pages/WelcomePage';
import LoginPage           from './pages/LoginPage';
import ForgotPasswordPage  from './pages/ForgotPasswordPage';
import VerifyEmailPage     from './pages/VerifyEmailPage';
import NewPasswordPage     from './pages/NewPasswordPage';
import PasswordUpdatedPage from './pages/PasswordUpdatedPage';
import RegisterStep1Page   from './pages/RegisterStep1Page';
import RegisterStep2Page   from './pages/RegisterStep2Page';
import HomePage            from './pages/HomePage';
import VitrinePage         from './pages/VitrinePage';
import CheckoutPage        from './pages/CheckoutPage';
import GerenciamentoAdmin  from './pages/GerenciamentoAdmin';
import UserProfilePage     from './pages/UserProfilePage';
import EditProfilePage     from './pages/EditProfilePage';
import AdminProfilePage    from './pages/AdminProfilePage';
import HistoricoUsuario    from './pages/HistoricoUsuario';

export default function App() {
  return (
    /* CartProvider aqui: carrinho persiste de /vitrine para /checkout */
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                    element={<WelcomePage />} />

          <Route path="/login"               element={<LoginPage />} />
          <Route path="/recuperar-senha"     element={<ForgotPasswordPage />} />
          <Route path="/verificar-email"     element={<VerifyEmailPage />} />
          <Route path="/nova-senha"          element={<NewPasswordPage />} />
          <Route path="/senha-atualizada"    element={<PasswordUpdatedPage />} />

          <Route path="/cadastro"            element={<RegisterStep1Page />} />
          <Route path="/cadastro/senha"      element={<RegisterStep2Page />} />

          <Route path="/home"                element={<HomePage />} />

          <Route path="/perfil"              element={<UserProfilePage />} />
          <Route path="/perfil/editar"       element={<EditProfilePage />} />
          <Route path="/perfil/admin"        element={<AdminProfilePage />} />

          <Route path="/historico/usuario"   element={<HistoricoUsuario />} />

          <Route path="/vitrine"             element={<VitrinePage />} />
          <Route path="/checkout"            element={<CheckoutPage />} />
          <Route path="/admin"               element={<GerenciamentoAdmin />} />

          <Route path="*"                    element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}