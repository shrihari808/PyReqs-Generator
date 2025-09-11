import React from 'react';
import { DownloadIcon, FileTextIcon, WarningIcon, CheckIcon } from './Icons';

interface ResultDisplayProps {
  requirementsContent: string;
  conflictsContent: string;
  hasConflicts: boolean;
  onReset: () => void;
}

const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ requirementsContent, conflictsContent, hasConflicts, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 rounded-lg p-6 sm:p-8 animate-fade-in text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">Analysis Complete</h2>
        <p className="text-slate-400 mb-8">Your files have been processed. You can now download the generated files.</p>
        
        <div className="space-y-4">
            {/* Requirements File Card */}
            <div className="bg-slate-900/50 p-5 rounded-lg flex items-center justify-between text-left">
                <div className="flex items-center gap-4">
                    <FileTextIcon className="w-10 h-10 text-sky-400 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-lg text-white">requirements.txt</h3>
                        <p className="text-sm text-slate-400">Contains detected package dependencies.</p>
                    </div>
                </div>
                <button
                    onClick={() => handleDownload('requirements.txt', requirementsContent)}
                    className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                    <DownloadIcon className="w-5 h-5" />
                    <span>Download</span>
                </button>
            </div>

            {/* Conflicts File Card */}
            <div className={`p-5 rounded-lg flex items-center justify-between text-left border ${hasConflicts ? 'bg-amber-900/20 border-amber-500/30' : 'bg-slate-900/50 border-slate-700/50'}`}>
                <div className="flex items-center gap-4">
                    {hasConflicts ? (
                        <WarningIcon className="w-10 h-10 text-amber-400 flex-shrink-0" />
                    ) : (
                        <CheckIcon className="w-10 h-10 text-green-400 flex-shrink-0" />
                    )}
                    <div>
                        <h3 className={`font-bold text-lg ${hasConflicts ? 'text-amber-300' : 'text-white'}`}>conflicts.txt</h3>
                        <p className={`text-sm ${hasConflicts ? 'text-amber-400/80' : 'text-slate-400'}`}>
                            {hasConflicts ? 'Contains potential dependency issues.' : 'No dependency conflicts found.'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => handleDownload('conflicts.txt', conflictsContent)}
                    className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-lg text-sm transition-colors text-white ${hasConflicts ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                >
                    <DownloadIcon className="w-5 h-5" />
                    <span>Download</span>
                </button>
            </div>
        </div>

        <button
            onClick={onReset}
            className="w-full mt-8 bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
        >
            Analyze Another Project
        </button>
    </div>
  );
};

export default ResultDisplay;