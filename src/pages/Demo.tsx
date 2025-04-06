import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Demo() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      id: 'overview',
      title: 'Overview',
      content: 'Experience a fully functional virtual office environment with real-time collaboration features.',
    },
    {
      id: 'chat',
      title: 'Chat',
      content: 'Instant messaging and group chat capabilities for seamless team communication.',
    },
    {
      id: 'meetings',
      title: 'Meetings',
      content: 'Virtual meeting rooms with video conferencing and screen sharing capabilities.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 px-6 pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Virtual Office Demo
          </h1>
          <Link 
            to="/" 
            className="btn-secondary"
          >
            Back to Home
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === feature.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`${activeTab === feature.id ? 'block' : 'hidden'}`}
              >
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {feature.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.content}
                </p>
                <button 
                  className="btn-primary mt-6"
                  onClick={() => alert(`${feature.title} feature demo coming soon!`)}
                >
                  Try {feature.title}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Ready to get started?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Set up your own virtual office and experience all features with your team.
          </p>
          <Link 
            to="/setup-office" 
            className="btn-primary"
          >
            Setup Your Office
          </Link>
        </div>
      </div>
    </div>
  );
}