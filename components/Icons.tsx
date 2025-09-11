import React from 'react';

export const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14.238 10.024a2.25 2.25 0 00-1.07-3.693l-4.14-1.183A2.25 2.25 0 006.5 7.172V9.75a.75.75 0 001.5 0V7.53l3.639 1.04a.75.75 0 11-.53 1.418L7.02 8.03v2.24a.75.75 0 001.5 0V9.32l3.64 1.04a2.25 2.25 0 001.07 3.693l4.14 1.183a2.25 2.25 0 002.528-2.023v-2.5a.75.75 0 00-1.5 0v2.14l-3.64-1.04a.75.75 0 01.53-1.418l4.088 1.168v-2.24a.75.75 0 00-1.5 0v.95l-3.64-1.04zM8 12.75a.75.75 0 00-1.5 0v4.32a2.25 2.25 0 002.528 2.023l4.14-1.183a2.25 2.25 0 001.07-3.693l-4.14-1.182a2.25 2.25 0 00-2.528 2.023v.25a.75.75 0 001.5 0v-.32l3.64 1.04a.75.75 0 11-.53 1.418l-4.088-1.168v.92a.75.75 0 001.5 0v-.03l3.64 1.04a2.25 2.25 0 00-1.07 3.693l-4.14 1.183A2.25 2.25 0 006.5 16.828v-4.08a.75.75 0 00-1.5 0v4.32z" />
  </svg>
);

export const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.046A12.705 12.705 0 0110 6a12.705 12.705 0 015.986-1.899l.149.046a.75.75 0 10.23-1.482A13.455 13.455 0 0014 4.193v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 7.5a.75.75 0 01.75.75v6a.75.75 0 01-1.5 0v-6a.75.75 0 01.75-.75zM8.084 9.58a.75.75 0 00-1.414.536l.25 2.5a.75.75 0 001.414-.536l-.25-2.5zm4.249 2.5l-.25-2.5a.75.75 0 00-1.414.536l.25 2.5a.75.75 0 001.414-.536z" clipRule="evenodd" />
    <path d="M4.25 8.5c-.52 0-1.01.07-1.486.203a.75.75 0 00-.638.835l.343 3.43A3.75 3.75 0 006.25 16h7.5a3.75 3.75 0 003.73-3.032l.343-3.43a.75.75 0 00-.638-.835A13.43 13.43 0 0015.75 8.5h-11.5z" />
  </svg>
);

export const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h18v-3.75M3 12l3-3m15 3l-3-3" />
    </svg>
);

export const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>
);

export const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

export const WarningIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
);

export const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);