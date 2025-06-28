import React, { useState } from 'react';
import { FileText, Moon, Sun, User } from 'lucide-react';
import AboutMeModal from './about/AboutMeModal';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <>
      <header className={`py-4 px-6 flex items-center justify-between shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary-600" />
          <h1 className="text-xl font-bold">Resume Analyzer Pro</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <User size={18} />
            <span className="text-sm font-medium">Meet the Creator</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <AboutMeModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
      />
    </>
  );
};

export default Header;