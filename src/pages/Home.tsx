import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Home() {
  const navigate = useNavigate();

  const handleSetupClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      navigate('/setup-office');
    } else {
      navigate('/login', { state: { returnTo: '/setup-office' } });
    }
  };

  return (
    <div className="auth-container flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-8">
          Welcome To Your <span className="text-primary">Virtual Office</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/demo" 
            className="btn-primary inline-block text-center"
            role="button"
          >
            Instant Demo
          </Link>
          <button 
            onClick={handleSetupClick} 
            className="btn-secondary"
          >
            Setup Your Company
          </button>
        </div>
      </div>
    </div>
  );
}