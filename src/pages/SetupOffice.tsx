import { useState } from 'react';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CompanyData {
  name: string;
  email: string;
  company: string;
  website: string;
  size: string;
}

export default function App() {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CompanyData>({
    name: '',
    email: '',
    company: '',
    website: '',
    size: '',
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        website: '',
        size: '',
      });
      setLogoPreview(null);
      setLogoFile(null);

      // Redirect to Features page after a short delay
      setTimeout(() => {
        navigate('/features');
      }, 1500);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving company data');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container flex items-center justify-center pt-20 pb-8 px-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 w-full max-w-md h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
        <h2 className="text-xl font-semibold text-center text-white mb-6">Set Up Your Office</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm p-3 rounded mb-4">
            Company setup successful! Redirecting to Features...
          </div>
        )}

        {/* Logo Upload Circle */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <input
            type="file"
            id="logo-upload"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
          <label
            htmlFor="logo-upload"
            className="cursor-pointer block w-full h-full"
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center ${
              logoPreview ? '' : 'bg-[#1e3a5f] border-2 border-dashed border-white/20'
            }`}>
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Company logo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-6 h-6 text-white/80" />
                  <span className="text-white/80 text-xs mt-1">Upload Logo</span>
                </div>
              )}
            </div>
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
              Enter Your Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="First & Last Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
              Enter Your Email *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Email Here"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">
              Your Company Name *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Name Here"
              required
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-white/80 mb-1">
              Your Company Website *
            </label>
            <input
              type="url"
              id="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Website Here"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Company Size *
            </label>
            <select 
              id="size"
              value={formData.size}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40 [&>option]:bg-[#1e3a5f] [&>option]:text-white"
              required
            >
              <option value="" disabled>Choose Your Company Size</option>
              <option value="0-10">0 to 10 Employees</option>
              <option value="11-50">11 to 50 Employees</option>
              <option value="50+">&gt; Than 50 Employees</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#1e3a5f] text-white py-2 rounded hover:bg-[#2a4d7c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-white/60">
          <a href="#" className="hover:text-white">Terms & Conditions</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}