import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([formData]);

      if (error) throw error;

      toast.success('Thank you for your message! We will get back to you soon.', {
        duration: 5000,
        style: {
          background: '#10B981',
          color: '#FFFFFF',
          padding: '16px',
          borderRadius: '8px',
        },
        iconTheme: {
          primary: '#FFFFFF',
          secondary: '#10B981',
        },
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navigation Spacer */}
      <div className="h-[64px] flex-none" />
      
      {/* Main Content Area */}
      <div 
        className="flex-1 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80')`
        }}
      >
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">Get in Touch</h1>
            <p className="text-xl text-gray-300">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mb-4">
                <Phone className="text-[#f59e0b]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-400">+251925546881</p>
              <p className="text-gray-400">Mon-Fri 9am-6pm</p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-[#f59e0b]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400">support@example.com</p>
              <p className="text-gray-400">24/7 Support</p>
            </div>

            <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-[#f59e0b]" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Office</h3>
              <p className="text-gray-400">Bole Dembel</p>
              <p className="text-gray-400">Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                    placeholder="Dagim Dana"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                    placeholder="Dagim@example.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                  placeholder="How can we help?"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                  placeholder="Your message..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-3 bg-[#f59e0b] text-white font-semibold rounded-lg hover:bg-[#f59e0b]/90 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send size={18} />
              </button>
            </form>
          </div>

          <div className="flex justify-between mt-8 text-sm text-gray-400">
            <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;