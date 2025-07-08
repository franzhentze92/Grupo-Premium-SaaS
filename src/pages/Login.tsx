import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { user } = useAuth();

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e3269] p-4">
      <div className="w-full max-w-md">
        <LoginForm />
        <p className="text-center text-gray-500 text-sm mt-8">
          © 2025 Premium Desarrollo Inmobiliario. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
