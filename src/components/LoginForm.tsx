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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <CardTitle className="text-center text-2xl font-bold text-primary">
          Premium Desarrollo Inmobiliario
        </CardTitle>
        <CardDescription className="text-center">
          Sistema de Monitoreo Interno
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reset-email" className="text-sm font-medium">
                  Correo Electrónico
                </label>
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="su.correo@ejemplo.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              {message && <p className="text-sm text-primary">{message}</p>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Enviar Enlace de Restablecimiento
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
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
                <label htmlFor="email" className="text-sm font-medium">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="su.correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Iniciar Sesión
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleLogin}
              >
                Iniciar Sesión con Google
              </Button>
              <Button 
                type="button" 
                variant="link" 
                className="w-full text-primary" 
                onClick={handleDemoLogin}
              >
                Usar Credenciales Demo
              </Button>
              <div className="text-sm text-center text-gray-500 mt-2">
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
            className="w-full" 
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
