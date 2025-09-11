
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
            PyReqs Generator
          </h1>
          <p className="mt-3 text-lg text-slate-400 max-w-2xl mx-auto">
            Upload your Python files and let AI create a <code className="bg-slate-700/50 text-sky-300 px-2 py-1 rounded-md font-mono text-base">requirements.txt</code> file for you, complete with version detection.
          </p>
        </header>
    );
};

export default Header;
