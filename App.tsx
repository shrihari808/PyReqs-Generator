import React, { useState, useCallback } from 'react';
import { generateRequirements, Conflict } from './services/geminiService';
import FileInput from './components/FileInput';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { PythonIcon, TrashIcon } from './components/Icons';
import Header from './components/Header';

type AppState = 'initial' | 'files_selected' | 'loading' | 'result' | 'error';

export default function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [requirementsContent, setRequirementsContent] = useState<string>('');
  const [conflictsContent, setConflictsContent] = useState<string>('');
  const [hasConflicts, setHasConflicts] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>('initial');

  const handleFilesChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const ignoredPathsRegex = /(^|\/)venv\/|(^|\/)__pycache__\//;
      const pyFiles = Array.from(selectedFiles).filter(file => {
        const path = (file as any).webkitRelativePath || file.name;
        return file.name.endsWith('.py') && !ignoredPathsRegex.test(path);
      });
      
      if (pyFiles.length > 0) {
        setFiles(prevFiles => {
            const newFiles = pyFiles.filter(pf => 
                !prevFiles.some(f => 
                    ((f as any).webkitRelativePath || f.name) === ((pf as any).webkitRelativePath || pf.name) && 
                    f.size === pf.size
                )
            );
            return [...prevFiles, ...newFiles];
        });
        setAppState('files_selected');
      }
    }
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => {
        const newFiles = prevFiles.filter(file => file !== fileToRemove);
        if (newFiles.length === 0) {
            setAppState('initial');
        }
        return newFiles;
    });
  };

  const clearFiles = () => {
    setFiles([]);
    setAppState('initial');
  };
  
  const handleGenerate = useCallback(async () => {
    if (files.length === 0) return;

    setAppState('loading');
    setError(null);
    setRequirementsContent('');
    setConflictsContent('');
    setHasConflicts(false);

    try {
      const result = await generateRequirements(files);
      setRequirementsContent(result.requirements);
      setHasConflicts(result.conflicts.length > 0);

      let formattedConflicts: string;
      if (result.conflicts.length > 0) {
        formattedConflicts = "Potential Dependency Conflicts Found:\n\n";
        formattedConflicts += result.conflicts.map((c, index) =>
            `Conflict #${index + 1}\n` +
            `Packages: ${c.packages.map(p => `\`${p}\``).join(', ')}\n` +
            `Description: ${c.description}`
        ).join('\n\n--------------------------------------\n\n');
      } else {
          formattedConflicts = "No potential dependency conflicts were detected in the provided files.";
      }
      setConflictsContent(formattedConflicts);

      setAppState('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAppState('error');
    }
  }, [files]);

  const handleReset = () => {
      setFiles([]);
      setRequirementsContent('');
      setConflictsContent('');
      setHasConflicts(false);
      setError(null);
      setAppState('initial');
  };

  const renderContent = () => {
    switch(appState) {
        case 'loading':
            return <Loader message="Analyzing your codebase... this may take a moment." />;
        case 'result':
            return <ResultDisplay 
                        requirementsContent={requirementsContent} 
                        conflictsContent={conflictsContent}
                        hasConflicts={hasConflicts}
                        onReset={handleReset} 
                    />;
        case 'error':
            return (
                <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
                    <h3 className="text-xl font-bold text-red-400 mb-2">Analysis Failed</h3>
                    <p className="text-red-300 mb-6">{error}</p>
                    <button 
                        onClick={handleReset} 
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Start Over
                    </button>
                </div>
            );
        case 'initial':
        case 'files_selected':
        default:
            return (
                <div className="w-full max-w-2xl mx-auto space-y-6">
                    {/* Fix: In this component path, appState can never be 'loading', so the check is always false. 
                        The component is unmounted during loading, so it is effectively disabled. 
                        Passing `false` resolves the type error and maintains correct behavior. */}
                    <FileInput onFilesSelected={handleFilesChange} disabled={false}/>
                    
                    {files.length > 0 && (
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-slate-300">Selected Python Files</h3>
                                <button onClick={clearFiles} className="text-sm text-slate-400 hover:text-white transition-colors">Clear All</button>
                            </div>
                            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                {files.map((file, index) => {
                                    const filePath = (file as any).webkitRelativePath || file.name;
                                    return (
                                        <li key={`${filePath}-${file.size}-${index}`} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-md">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <PythonIcon className="w-6 h-6 text-sky-400 flex-shrink-0" />
                                                <span className="font-mono text-sm text-slate-200 truncate" title={filePath}>
                                                    {filePath}
                                                </span>
                                            </div>
                                            <button onClick={() => removeFile(file)} className="p-1 text-slate-500 hover:text-red-400 rounded-full transition-colors flex-shrink-0">
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <button 
                                onClick={handleGenerate} 
                                disabled={files.length === 0}
                                className="w-full mt-6 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
                            >
                                Generate requirements.txt
                            </button>
                        </div>
                    )}
                </div>
            );
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}