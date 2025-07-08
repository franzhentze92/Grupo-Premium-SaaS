import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  
  const { login, forgotPassword, googleLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch (error) {
      setError('Correo electrónico o contraseña inválidos');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    if (!resetEmail) {
      setError('Por favor ingrese su correo electrónico');
      return;
    }
    
    try {
      await forgotPassword(resetEmail);
      setMessage('Correo de restablecimiento enviado. Por favor revise su bandeja de entrada.');
      setResetEmail('');
    } catch (error) {
      setError('Error al enviar el correo de restablecimiento');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await googleLogin();
    } catch (error) {
      setError('Error al iniciar sesión con Google');
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@premiumdesarrollo.com');
    setPassword('demo123');
  };

  return (
    <Card className="w-full max-w-md mx-auto border-2 border-[#1e3269] shadow-lg">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <div className="bg-[#1e3269] rounded p-1 flex items-center justify-center" style={{height: 40, width: 40}}>
            <img src="/grupo-premium-logo.gif" alt="Grupo Premium Logo" className="h-8 w-8 object-contain" />
          </div>
        </div>
        <CardTitle className="text-center text-2xl font-bold text-[#1e3269]">
          Premium Desarrollo Inmobiliario
        </CardTitle>
        <CardDescription className="text-center text-[#1e3269] opacity-70">
          Sistema de Monitoreo Interno
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reset-email" className="text-sm font-medium text-[#1e3269]">
                  Correo Electrónico
                </label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="su.correo@ejemplo.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="bg-white border border-[#1e3269] text-[#1e3269] placeholder:text-[#b3b8c5] focus:border-[#fbbf24] focus:ring-[#fbbf24]"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {message && <p className="text-sm text-[#1e3269]">{message}</p>}
              <Button type="submit" className="w-full bg-[#1e3269] text-white hover:bg-[#fbbf24] hover:text-[#1e3269]">
                Enviar Enlace de Restablecimiento
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-[#1e3269] text-[#1e3269] hover:bg-[#fbbf24] hover:text-[#1e3269]" 
                onClick={() => setShowForgotPassword(false)}
              >
                Volver a Iniciar Sesión
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#1e3269]">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="su.correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border border-[#1e3269] text-[#1e3269] placeholder:text-[#b3b8c5] focus:border-[#fbbf24] focus:ring-[#fbbf24]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#1e3269]">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white border border-[#1e3269] text-[#1e3269] placeholder:text-[#b3b8c5] focus:border-[#fbbf24] focus:ring-[#fbbf24]"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-[#1e3269] text-white hover:bg-[#fbbf24] hover:text-[#1e3269]">
                Iniciar Sesión
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full border-[#1e3269] text-[#1e3269] hover:bg-[#fbbf24] hover:text-[#1e3269]" 
                onClick={handleGoogleLogin}
              >
                Iniciar Sesión con Google
              </Button>
              <Button 
                type="button" 
                variant="link" 
                className="w-full text-[#1e3269] hover:text-[#fbbf24]" 
                onClick={handleDemoLogin}
              >
                Usar Credenciales Demo
              </Button>
              <div className="text-sm text-center text-[#1e3269] mt-2">
                <strong>Demo:</strong> demo@premiumdesarrollo.com / demo123
              </div>
            </div>
          </form>
        )}
      </CardContent>
      {!showForgotPassword && (
        <CardFooter>
          <Button 
            variant="link" 
            className="w-full text-[#1e3269] hover:text-[#fbbf24]" 
            onClick={() => setShowForgotPassword(true)}
          >
            ¿Olvidó su contraseña?
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default LoginForm;
