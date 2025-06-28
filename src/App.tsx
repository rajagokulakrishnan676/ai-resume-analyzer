import React, { useState } from 'react';
import { FileText, Moon, Sun } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AnalysisProvider } from './context/AnalysisContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <AnalysisProvider>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Dashboard />
          </main>
        </div>
        <footer className={`py-4 px-6 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="flex items-center justify-center gap-2">
            <FileText size={16} />
            <span>Resume Analyzer Pro &copy; {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </AnalysisProvider>
  );
}

export default App;