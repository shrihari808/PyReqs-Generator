import React, { useState, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface FileInputProps {
  onFilesSelected: (files: FileList | null) => void;
  disabled: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ onFilesSelected, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  }, [disabled, onFilesSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilesSelected(e.target.files);
  };

  const baseClasses = "relative block w-full border-2 border-dashed rounded-lg p-12 text-center transition-colors duration-300";
  const inactiveClasses = "border-slate-600 hover:border-sky-500 bg-slate-800/30 hover:bg-slate-800/60";
  const activeClasses = "border-sky-400 bg-sky-900/30";
  const disabledClasses = "cursor-not-allowed bg-slate-700/50 border-slate-500";
  
  return (
    <div>
        <label
            htmlFor="file-upload"
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`${baseClasses} ${disabled ? disabledClasses : (isDragging ? activeClasses : inactiveClasses)}`}
        >
            <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="sr-only" 
                // @ts-ignore - for non-standard directory attributes
                webkitdirectory=""
                directory=""
                onChange={handleChange}
                disabled={disabled}
            />
            <div className="flex flex-col items-center space-y-4">
                <UploadIcon className="w-12 h-12 text-slate-500" />
                <span className="font-semibold text-slate-300">
                    <span className="text-sky-400">Select your project folder</span> or drag and drop
                </span>
                <p className="text-xs text-slate-400">All .py files will be analyzed, excluding 'venv' and '__pycache__' directories.</p>
            </div>
        </label>
    </div>
  );
};

export default FileInput;