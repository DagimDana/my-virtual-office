import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { format } from 'date-fns';
import { Trash2, Mail, CheckCircle, XCircle, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'pending' | 'responded';
}

export default function AdminPanel() {
//   const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session) {
        fetchMessages();
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) throw error;

      setIsAuthenticated(true);
      setLoginData({ email: '', password: '' });
      fetchMessages();
    } catch (error: any) {
      console.error('Error logging in:', error);
      setAuthError(error.message || 'Failed to log in');
      toast.error('Failed to log in. Please check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
      setMessages([]);
      setSelectedMessage(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.filter(msg => msg.id !== id));
      setSelectedMessage(null);
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const updateMessageStatus = async (id: string, status: 'pending' | 'responded') => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, status } : msg
      ));
      toast.success(`Message marked as ${status}`);
    } catch (error) {
      console.error('Error updating message status:', error);
      toast.error('Failed to update message status');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl border border-gray-700">
          <div>
            <h2 className="text-center text-3xl font-bold text-white">Admin Login</h2>
          </div>
          {authError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md">
              {authError}
            </div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#f59e0b] hover:bg-[#f59e0b]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f59e0b] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-[64px] flex-none bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
      
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80')`
        }}
      >
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-8">Contact Messages</h2>

            {loading ? (
              <div className="text-center text-gray-300">Loading messages...</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white mb-4">Message List</h3>
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                        selectedMessage?.id === message.id
                          ? 'bg-gray-700/50 border-[#f59e0b]'
                          : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-white">{message.name}</h3>
                        <span className="text-sm text-gray-400">
                          {format(new Date(message.created_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{message.subject}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">{message.email}</span>
                        <span className={`text-sm px-2 py-1 rounded ${
                          message.status === 'responded' 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {message.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 h-fit">
                  {selectedMessage ? (
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <h2 className="text-xl font-semibold text-white">Message Details</h2>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(selectedMessage.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                            title="Delete message"
                          >
                            <Trash2 size={20} />
                          </button>
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="p-2 text-[#f59e0b] hover:text-[#f59e0b]/80 transition-colors duration-200"
                            title="Reply via email"
                          >
                            <Mail size={20} />
                          </a>
                          {selectedMessage.status === 'pending' ? (
                            <button
                              onClick={() => updateMessageStatus(selectedMessage.id, 'responded')}
                              className="p-2 text-green-400 hover:text-green-300 transition-colors duration-200"
                              title="Mark as responded"
                            >
                              <CheckCircle size={20} />
                            </button>
                          ) : (
                            <button
                              onClick={() => updateMessageStatus(selectedMessage.id, 'pending')}
                              className="p-2 text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                              title="Mark as pending"
                            >
                              <XCircle size={20} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">From</label>
                          <p className="text-white">{selectedMessage.name} ({selectedMessage.email})</p>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Subject</label>
                          <p className="text-white">{selectedMessage.subject}</p>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Message</label>
                          <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Received</label>
                          <p className="text-white">
                            {format(new Date(selectedMessage.created_at), 'PPpp')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      Select a message to view details
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}