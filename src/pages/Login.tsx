import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    }
  };

  return (
    <div className="auth-container flex items-center justify-center pt-20 pb-8 px-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-semibold text-center text-white mb-6">Welcome Back</h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Email Here"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
              Enter Your Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Type Password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-[#1e3a5f] text-white py-2 rounded hover:bg-[#2a4d7c] transition-colors">
            Continue
          </button>
          <div className="text-center">
            <p className="text-sm text-white/80 mb-2">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                state={{ returnTo }} 
                className="text-primary hover:text-primary/90"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-sm text-white/80">
              By proceeding you are agreeing to the{' '}
              <Link to="/terms" className="text-primary hover:text-primary/90">Terms & Conditions</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary hover:text-primary/90">Privacy Policy</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}